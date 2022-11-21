import { ErrorFindingStripe } from "../modules/payment-methods/stripe/domain/ErrorFindingStripe";
import { IStripeMetadata } from "../modules/payment-methods/stripe/domain/IStripeMetadata";
import { IPaymentDetailsPrimitives } from "../modules/payment-methods/stripe/domain/PaymentDetails";
import { StripePayments } from "../modules/payment-methods/stripe/infrastructure/StripePayments";
import {
  createStripeCustomerHandler,
  findCustomerHandler,
  paymentIntentHandler,
  saveStripeHandler,
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
    metadata: IStripeMetadata;
  }): Promise<IPaymentDetailsPrimitives> {
    const { userId, amount, metadata } = params;
    try {
      const stripeFound = await findCustomerHandler.findByUserId(params.userId);
      const paymentDetails = await paymentIntentHandler.withoutPaymentMethod(
        stripeFound.customerId,
        amount,
        metadata
      );
      return paymentDetails;
    } catch (err) {
      console.error(err);
      if (err instanceof ErrorFindingStripe) {
        const customerId = await this.createNewStripeCustomer(userId);
        const paymentDetails = await paymentIntentHandler.withoutPaymentMethod(
          customerId,
          amount
        );
        return paymentDetails;
      }
      throw new Error("Something Went Wrong Creating a Payment");
    }
  }

  static async paymentWithPaymentMethod(params: {
    userId: string;
    amount: number;
    paymentMethodId: string;
    metadata: IStripeMetadata;
  }): Promise<IPaymentDetailsPrimitives> {
    const { userId, amount, paymentMethodId, metadata } = params;
    try {
      const stripeFound = await findCustomerHandler.findByUserId(params.userId);
      const paymentDetails = await paymentIntentHandler.withPaymentMethod(
        stripeFound.customerId,
        amount,
        paymentMethodId,
        metadata
      );
      await paymentIntentHandler.confirmPaymentIntent(paymentDetails.id);
      return paymentDetails;
    } catch (err) {
      if (err instanceof ErrorFindingStripe) {
        const customerId = await this.createNewStripeCustomer(userId);
        const paymentDetails = await paymentIntentHandler.withPaymentMethod(
          customerId,
          amount,
          paymentMethodId
        );
        return paymentDetails;
      }
      throw new Error("Something Went Wrong Creating a Payment");
    }
  }

  static async createNewStripeCustomer(userId: string): Promise<string> {
    const customerId = await createStripeCustomerHandler.create();
    await saveStripeHandler.save({
      id: UniqId.generate(),
      userId,
      customerId,
    });
    return customerId;
  }
}
