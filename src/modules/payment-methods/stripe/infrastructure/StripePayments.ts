import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { UniqId } from "@/src/utils/UniqId";
import Stripe from "stripe";
import { CardDetails } from "../domain/CardDetails";
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

interface IPaymentWithPaymentMethod {
  customerId: CustomerId;
  amount: PaymentAmount;
  paymentMethod: PaymentMethodId;
  metadata?: IStripeMetadata;
}

interface IPaymentWithoutPaymentMethod {
  customerId: CustomerId;
  amount: PaymentAmount;
  metadata?: IStripeMetadata;
}

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
      clientSecret: paymentDetails.client_secret!,
    });
  }

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
      clientSecret: paymentIntent.client_secret!,
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
      clientSecret: paymentIntent.client_secret!,
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
}
