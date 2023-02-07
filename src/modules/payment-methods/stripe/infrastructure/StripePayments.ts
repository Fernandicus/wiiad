import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { UniqId } from "@/src/utils/UniqId";
import Stripe from "stripe";
import { CardDetails, ICardDetailsPrimitives } from "../domain/CardDetails";
import { CustomerId } from "../domain/value-objects/CustomerId";
import { IStripeMetadata } from "../domain/interfaces/IStripeMetadata";
import { PaymentAmount } from "../domain/value-objects/PaymentAmount";
import { PaymentDetails } from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/value-objects/PaymentIntentId";
import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";
import { PaymentStatus } from "../domain/value-objects/PaymentStatus";
import { CardBrand } from "../domain/value-objects/CardBrand";
import { Last4 } from "../domain/value-objects/Last4";
import { ExpYear } from "../domain/value-objects/ExpYear";
import { ExpMonth } from "../domain/value-objects/ExpMonth";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { LaunchCampaignController } from "@/src/modules/campaign/infrastructure/controllers/LaunchCampaignController";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { findCustomerHandler, updateStripeHandler } from "./stripe-container";
import { ErrorPaymentValidation } from "../domain/errors/ErrorPaymentValidation";
import { Email } from "@/src/common/domain/Email";
import { SetupIntentId } from "../domain/value-objects/SetupIntentId";
import { StripeClientSecret } from "../domain/value-objects/StripeClientSecret";

export interface IPaymentWithPaymentMethod {
  customerId: CustomerId;
  amount: PaymentAmount;
  paymentMethod: PaymentMethodId;
  metadata?: IStripeMetadata;
}

export interface IPaymentWithoutPaymentMethod {
  customerId: CustomerId;
  amount: PaymentAmount;
  metadata?: IStripeMetadata;
}

interface IChargesData {
  payment_method_details: {
    card: {
      brand: string;
      exp_month: number;
      exp_year: number;
      fingerprint: string;
      last4: string;
    };
  };
}

export interface IWebHookPaymentSuccess {
  metadata: IStripeMetadata;
  amount: number;
  payment_method: string;
  charges: {
    data: IChargesData[];
  };
}

export interface IValidatedPaymentData {
  budget: CampaignBudget;
  metadata: IStripeMetadata;
  card: CardDetails;
}

export interface IStripePayload {
  type: StripeEventType;
  data: {
    object: IWebHookPaymentSuccess;
  };
}

export interface ISetupIntent {
  id: SetupIntentId;
  client_secret: StripeClientSecret;
}

export type StripeEventType =
  | "payment_intent.succeeded"
  | "payment_intent.cancelled"
  | "payment_intent.created";

//?https://stripe.com/docs/cli/trigger

export class StripePayments {
  constructor(private stripe: Stripe) {}

  async getPaymentMethodDetails(
    id: PaymentMethodId
  ): Promise<CardDetails | null> {
    const paymentDetails = await this.stripe.paymentMethods.retrieve(id.id);

    if (!paymentDetails) return null;
    if (!paymentDetails.card) return null;
    const card = paymentDetails.card;

    return new CardDetails({
      paymentMethodId: new PaymentMethodId(paymentDetails.id),
      brand: new CardBrand(card.brand),
      last4: new Last4(card.last4),
      expYear: new ExpYear(card.exp_year),
      expMonth: new ExpMonth(card.exp_month),
    });
  }

  async getPaymentIntentDetails(
    id: PaymentIntentId
  ): Promise<PaymentDetails | null> {
    const paymentDetails = await this.stripe.paymentIntents.retrieve(id.id);
    if (!paymentDetails) return null;

    return new PaymentDetails({
      id: id,
      amount: new PaymentAmount(paymentDetails.amount),
      paymentMethodId: new PaymentMethodId(
        paymentDetails.payment_method!.toString()
      ),
      clientSecret: new StripeClientSecret(paymentDetails.client_secret!),
    });
  }

  async setupIntent(customerId: CustomerId): Promise<ISetupIntent> {
    const setupIntent = await this.stripe.setupIntents.create({
      customer: customerId.id,
      payment_method_types: ["card"],
    });
    return {
      id: new SetupIntentId(setupIntent.id),
      client_secret: new StripeClientSecret(setupIntent.client_secret!),
    };
  }

  //? https://stripe.com/docs/payments/payment-intents#future-usage

  async paymentIntentWithoutPaymentMethod({
    customerId,
    amount,
    metadata,
  }: IPaymentWithoutPaymentMethod): Promise<PaymentDetails | null> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      metadata,
      customer: customerId.id,
      setup_future_usage: "off_session",
      amount: amount.amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!paymentIntent) return null;

    return new PaymentDetails({
      id: new PaymentIntentId(paymentIntent.id),
      amount: new PaymentAmount(paymentIntent.amount),
      paymentMethodId: paymentIntent.payment_method
        ? new PaymentMethodId(paymentIntent.payment_method?.toString())
        : undefined,
      clientSecret: new StripeClientSecret(paymentIntent.client_secret!),
    });
  }

  async paymentIntentWithPaymentMethod({
    customerId,
    amount,
    paymentMethod,
    metadata,
  }: IPaymentWithPaymentMethod): Promise<PaymentDetails | null> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      metadata, //* { adId: "123-456" },
      amount: amount.amount,
      currency: "eur",
      customer: customerId.id,
      payment_method: paymentMethod.id,
    });

    if (!paymentIntent) return null;

    return new PaymentDetails({
      id: new PaymentIntentId(paymentIntent.id),
      amount: new PaymentAmount(paymentIntent.amount),
      paymentMethodId: new PaymentMethodId(
        paymentIntent.payment_method!.toString()
      ),
      clientSecret: new StripeClientSecret(paymentIntent.client_secret!),
    });
  }

  async confirmPaymentIntent(id: PaymentIntentId): Promise<PaymentStatus> {
    const stripeIntent = await this.stripe.paymentIntents.confirm(id.id);

    switch (stripeIntent.status) {
      case "succeeded":
        return PaymentStatus.Success;
      default:
        return PaymentStatus.Error;
    }
  }

  async createCustomer(): Promise<CustomerId> {
    const customer = await this.stripe.customers.create();
    return new CustomerId(customer.id);
  }

  async validateWebhookEvent(params: {
    payload: string | Buffer;
    header: string | Buffer | string[];
  }): Promise<IValidatedPaymentData> {
    const { event, object } = this.getWebhookEvent(params);
    try {
      switch (event.type as StripeEventType) {
        case "payment_intent.succeeded":
          return this.validatePaymentData(object);
        default:
          throw ErrorPaymentValidation.eventType(event.type);
      }
    } catch (err) {
      if (err instanceof Error) throw new ErrorPaymentValidation(err.message);
      else throw err;
    }
  }

  private getWebhookEvent(params: {
    payload: string | Buffer;
    header: string | Buffer | string[];
  }): { event: Stripe.Event; object: IWebHookPaymentSuccess } {
    try {
      const event = this.webhookEvent(params);
      const object = event.data.object as IWebHookPaymentSuccess;
      return {
        event,
        object,
      };
    } catch (err) {
      if (err instanceof Error)
        throw ErrorPaymentValidation.webhookEvent(err.message);
      else throw err;
    }
  }

  private validatePaymentData(
    data: IWebHookPaymentSuccess
  ): IValidatedPaymentData {
    const amount = new PaymentAmount(data.amount);
    const budget = CampaignBudget.fromAmount(amount);
    const card = data.charges.data[0].payment_method_details.card;
    return {
      budget,
      metadata: data.metadata,
      card: new CardDetails({
        brand: new CardBrand(card.brand),
        expMonth: new ExpMonth(card.exp_month),
        expYear: new ExpYear(card.exp_year),
        last4: new Last4(card.last4),
        paymentMethodId: new PaymentMethodId(data.payment_method),
      }),
    };
  }

  private webhookEvent(params: {
    payload: string | Buffer;
    header: string | Buffer | string[];
  }) {
    let { header, payload } = params;
    const webhookSecret = process.env.STRIPE_SUCCESS_WEBHOOK_SECRET!;

    if (process.env.NODE_ENV === "test") {
      header = this.stripe.webhooks.generateTestHeaderString({
        payload: payload as string,
        secret: webhookSecret,
      });
    }

    return this.stripe.webhooks.constructEvent(payload, header, webhookSecret);
  }
}
