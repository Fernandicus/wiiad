import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { UniqId } from "@/src/utils/UniqId";
import Stripe from "stripe";
import { CardDetails } from "../domain/CardDetails";
import { CustomerId } from "../domain/CustomerId";
import { IStripeMetadata } from "../domain/IStripeMetadata";
import { PaymentAmount } from "../domain/PaymentAmount";
import { PaymentDetails } from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/PaymentIntentId";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { PaymentStatus } from "../domain/PaymentStatus";

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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
});

export class StripePayments {
  async getPaymentMethodDetails(
    id: PaymentMethodId
  ): Promise<CardDetails | null> {
    const paymentDetails = await stripe.paymentMethods.retrieve(id.id);
    if (!paymentDetails) return null;
    paymentDetails.card?.brand;
    return new CardDetails({
      id: UniqId.new(),
      paymentMethodId: id,
      brand: paymentDetails.card!.brand,
      last4: paymentDetails.card!.last4,
      expYear: paymentDetails.card!.exp_year,
      expMonth: paymentDetails.card!.exp_month,
    });
  }

  async getPaymentIntentDetails(
    id: PaymentIntentId
  ): Promise<PaymentDetails | null> {
    const paymentDetails = await stripe.paymentIntents.retrieve(id.id);
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
    const paymentIntent = await stripe.paymentIntents.create({
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
    const paymentIntent = await stripe.paymentIntents.create({
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
    const stripeIntent = await stripe.paymentIntents.confirm(id.id);

    switch (stripeIntent.status) {
      case "succeeded":
        return PaymentStatus.Success;
      default:
        return PaymentStatus.Error;
    }
  }

  async createCustomer(): Promise<CustomerId> {
    const customer = await stripe.customers.create();
    return new CustomerId(customer.id) ;
  }
}
