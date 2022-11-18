import { ErrorFindingStripe } from "../modules/payment-methods/stripe/domain/ErrorFindingStripe";
import { IStripeMetadata } from "../modules/payment-methods/stripe/domain/IStripeMetadata";
import { IPaymentDetailsPrimitives } from "../modules/payment-methods/stripe/domain/PaymentDetails";
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
    metadata: IStripeMetadata;
  }): Promise<IPaymentDetailsPrimitives> {
    const { userId, amount,metadata } = params;
    const stripePayment = new StripePayments();
    try {
      const stripeFound = await findCustomerHandler.findByUserId(params.userId);
      const paymentDetails = await paymentIntentHandler.withoutPaymentMethod(
        stripeFound.customerId,
        amount,
        metadata,
      );
      console.log(" stripeFound ", stripeFound);
      return paymentDetails;
    } catch (err) {
      console.error(err);
      if (err instanceof ErrorFindingStripe) {
        const newCustomer = await stripePayment.createCustomer();
        await saveCustomerHandler.save({
          userId,
          customerId: newCustomer.id,
          id: UniqId.generate(),
        });
        const paymentDetails = await paymentIntentHandler.withoutPaymentMethod(
          newCustomer.id,
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
    const stripePayment = new StripePayments();
    try {
      const stripeFound = await findCustomerHandler.findByUserId(params.userId);
      const paymentDetails = await paymentIntentHandler.withPaymentMethod(
        stripeFound.customerId,
        amount,
        paymentMethodId,
        metadata,
      );
      await paymentIntentHandler.confirmPaymentIntent(paymentDetails.id);
      return paymentDetails;
    } catch (err) {
      if (err instanceof ErrorFindingStripe) {
        const newCustomer = await stripePayment.createCustomer();
        await saveCustomerHandler.save({
          userId,
          customerId: newCustomer.id,
          id: UniqId.generate(),
        });
        const paymentDetails = await paymentIntentHandler.withPaymentMethod(
          newCustomer.id,
          amount,
          paymentMethodId
        );
        return paymentDetails;
      }
      throw new Error("Something Went Wrong Creating a Payment");
    }
  }
}
