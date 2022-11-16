import Stripe from "stripe";
import { CustomerId } from "../domain/CustomerId";
import { ErrorFindingPaymentMethod } from "../domain/ErrorFindingPaymentMethod";
import { PaymentAmount } from "../domain/PaymentAmount";
import { PaymentIntentId } from "../domain/PaymentIntentId";
import { PaymentMethodId } from "../domain/PaymentMethodId";

interface IPaymentWithPaymentId {
  customerId: CustomerId;
  amount: PaymentAmount;
  paymentMethod: PaymentMethodId;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
});

export class StripePayments {
  async getPaymentMethodFromPaymentIntent(
    paymentIntent: PaymentIntentId
  ): Promise<PaymentMethodId | null> {
    const paymentDetails = await stripe.paymentIntents.retrieve(
      paymentIntent.id
    );
    if (!paymentDetails) return null;
    return new PaymentMethodId(paymentDetails.payment_method!.toString());
  }

  async paymentIntentWithoutPaymentMethod(
    customerId: CustomerId,
    amount: PaymentAmount
  ): Promise<string | null> {
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customerId.id,
      setup_future_usage: "off_session",
      amount: amount.amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    if (!paymentIntent.client_secret) return null;
    return paymentIntent.client_secret;
  }

  async createCustomer(): Promise<Stripe.Response<Stripe.Customer>> {
    const customer = await stripe.customers.create();
    return customer;
  }

  async paymentIntentWithPaymentMethod({
    customerId,
    amount,
    paymentMethod,
  }: IPaymentWithPaymentId): Promise<string | null> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount.amount,
      currency: "eur",
      customer: customerId.id,
      payment_method: paymentMethod.id,
    });
    return paymentIntent.client_secret;
  }
}
