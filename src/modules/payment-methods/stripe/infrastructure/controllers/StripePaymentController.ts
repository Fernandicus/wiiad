import { ErrorFindingStripe } from "../../domain/errors/ErrorFindingStripe";
import { IStripeMetadata } from "../../domain/interfaces/IStripeMetadata";
import { IPaymentDetailsPrimitives } from "../../domain/PaymentDetails";
import {
  createStripeCustomerHandler,
  findCustomerHandler,
  paymentIntentHandler,
  saveStripeHandler,
} from "../stripe-container";
import { UniqId } from "../../../../../utils/UniqId";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { PaymentAmount } from "../../domain/value-objects/PaymentAmount";
import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";
import { ErrorFindingAd } from "@/src/modules/ad/domain/errors/ErrorFindingAd";

interface IPaymentParams {
  session: IUserPrimitives;
  budgetItem: number;
  adId: string;
}

interface IPaymentWithPMethod {
  paymentParams: IPaymentParams;
  paymentMethod?: string;
}

interface IPayParams {
  adId: string;
  session: IUserPrimitives;
  paymentMethod?: string;
  budgetItem: number;
}

export interface IPaymentIntent {
  clientSecret: string;
  paymentIntent: string;
}

export class StripePaymentController {
  static async pay(params: IPayParams): Promise<IPaymentDetailsPrimitives> {
    const { adId, session, paymentMethod, budgetItem } = params;
    await this.checkIfUserOwnsAd({ adId, session });
    const paymentData: IPaymentWithPMethod = {
      paymentMethod,
      paymentParams: {
        adId,
        budgetItem,
        session,
      },
    };
    const details = await this.throwPayment(paymentData);
    return details;
  }

  private static async checkIfUserOwnsAd({
    adId,
    session,
  }: {
    adId: string;
    session: IUserPrimitives;
  }): Promise<void> {
    const adFound = await adFinderHandler.findByAdId(adId);
    if (adFound.advertiserId !== session.id)
      throw ErrorFindingAd.byAdvertiserId(session.id);
  }

  private static async throwPayment(
    params: IPaymentWithPMethod
  ): Promise<IPaymentDetailsPrimitives> {
    const { paymentMethod, paymentParams } = params;
    if (!paymentMethod) {
      const details = await this.payWithoutPMethod(paymentParams);
      return details;
    } else {
      const details = await this.payWithPMethod({
        paymentParams,
        paymentMethod,
      });
      return details;
    }
  }

  private static async payWithPMethod({
    paymentParams,
    paymentMethod,
  }: IPaymentWithPMethod): Promise<IPaymentDetailsPrimitives> {
    const { adId, budgetItem, session } = paymentParams;
    const paymentAmount = PaymentAmount.fromItem(budgetItem);
    return await this.paymentWithPaymentMethod({
      userId: session!.id,
      paymentMethodId: paymentMethod!,
      amount: paymentAmount.amount,
      metadata: { adId, advertiserId: session!.id },
    });
  }

  private static async payWithoutPMethod(
    params: IPaymentParams
  ): Promise<IPaymentDetailsPrimitives> {
    const { adId, budgetItem, session } = params;
    const paymentAmount = PaymentAmount.fromItem(budgetItem);
    const details = await this.paymentWithoutPaymentMethod({
      userId: session!.id,
      amount: paymentAmount.amount,
      metadata: {
        adId,
        advertiserId: session.id,
      },
    });

    return details;
  }

  private static async paymentWithoutPaymentMethod(params: {
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
          amount,
          metadata
        );
        return paymentDetails;
      }
      throw new Error("Something Went Wrong Creating a Payment");
    }
  }

  private static async paymentWithPaymentMethod(params: {
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

  private static async createNewStripeCustomer(
    userId: string
  ): Promise<string> {
    const customerId = await createStripeCustomerHandler.create();
    await saveStripeHandler.save({
      id: UniqId.generate(),
      userId,
      customerId,
    });
    return customerId;
  }
}
