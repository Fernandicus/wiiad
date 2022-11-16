import { ErrorFindingStripe } from "../modules/payment-methods/stripe/domain/ErrorFindingStripe";
import { StripePayments } from "../modules/payment-methods/stripe/infrastructure/StripePayments";
import {
  findCustomerHandler,
  paymentIntentHandler,
  saveCustomerHandler,
} from "../modules/payment-methods/stripe/stripe-container";
import { UniqId } from "../utils/UniqId";

export interface IPaymentIntent {
  clientSecret: string;
  paymentIntent: string;
}

export class StripePaymentController {
  static async paymentWithoutPaymentMethod(params: {
    userId: string;
    amount: number;
  }): Promise<string> {
    const { userId, amount } = params;
    const stripePayment = new StripePayments();
    try {
      const stripeFound = await findCustomerHandler.findByUserId(params.userId);
      const clientSecret = await paymentIntentHandler.withoutPaymentMethod(
        stripeFound.customerId,
        amount
      );
      return clientSecret;
    } catch (err) {
      console.error(err);
      if (err instanceof ErrorFindingStripe) {
        const newCustomer = await stripePayment.createCustomer();
        await saveCustomerHandler.save({
          userId,
          customerId: newCustomer.id,
          id: UniqId.generate(),
        });
        const clientSecret = await paymentIntentHandler.withoutPaymentMethod(
          newCustomer.id,
          amount
        );
        return clientSecret;
      }
      throw new Error("Something Went Wrong Creating a Payment");
    }
  }

  static async paymentWithPaymentMethod(params: {
    userId: string;
    amount: number;
    paymentMethodId: string;
  }): Promise<string> {
    const { userId, amount, paymentMethodId } = params;
    const stripePayment = new StripePayments();
    try {
      const stripeFound = await findCustomerHandler.findByUserId(params.userId);
      const clientSecret = await paymentIntentHandler.withPaymentMethod(
        stripeFound.customerId,
        amount,
        paymentMethodId
      );
      return clientSecret;
    } catch (err) {
      if (err instanceof ErrorFindingStripe) {
        const newCustomer = await stripePayment.createCustomer();
        await saveCustomerHandler.save({
          userId,
          customerId: newCustomer.id,
          id: UniqId.generate(),
        });
        const clientSecret = await paymentIntentHandler.withPaymentMethod(
          newCustomer.id,
          amount,
          paymentMethodId,
        );
        return clientSecret;
      }
      throw new Error("Something Went Wrong Creating a Payment");
    }
  }
}
