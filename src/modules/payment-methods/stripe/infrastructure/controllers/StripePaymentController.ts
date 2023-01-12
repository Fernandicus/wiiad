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

interface IStripeControllerParams {
  adId: string;
  session: IUserPrimitives;
}

interface IPayWithPMethod {
  budgetItem: number;
  paymentMethod: string;
}

export class StripeCampaignPaymentController {
  private adId: string;
  private session: IUserPrimitives;

  private constructor({ adId, session }: IStripeControllerParams) {
    this.adId = adId;
    this.session = session;
  }

  static async validate(params: IStripeControllerParams) {
    const { adId, session } = params;
    await this.checkIfUserOwnsAd({ adId, session });
    return new StripeCampaignPaymentController({ adId, session });
  }

  private static async checkIfUserOwnsAd({
    adId,
    session,
  }: IStripeControllerParams): Promise<void> {
    const adFound = await adFinderHandler.findByAdId(adId);
    if (adFound.advertiserId !== session.id)
      throw ErrorFindingAd.byAdvertiserId(session.id);
  }

  async payWithPaymentMethod({
    budgetItem,
    paymentMethod,
  }: IPayWithPMethod): Promise<IPaymentDetailsPrimitives> {
    const paymentAmount = PaymentAmount.fromItem(budgetItem);
    return await this.paymentWithPMethod({
      userId: this.session.id,
      paymentMethodId: paymentMethod!,
      amount: paymentAmount.amount,
      metadata: { adId: this.adId, advertiserId: this.session.id },
    });
  }

  async payWithoutPaymentMethod(
    budgetItem: number
  ): Promise<IPaymentDetailsPrimitives> {
    const paymentAmount = PaymentAmount.fromItem(budgetItem);
    const details = await this.paymentWithoutPMethod({
      userId: this.session.id,
      amount: paymentAmount.amount,
      metadata: {
        adId: this.adId,
        advertiserId: this.session.id,
      },
    });

    return details;
  }

  private async paymentWithoutPMethod(params: {
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

  private async paymentWithPMethod(params: {
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

  private async createNewStripeCustomer(userId: string): Promise<string> {
    const customerId = await createStripeCustomerHandler.create();
    await saveStripeHandler.save({
      id: UniqId.generate(),
      userId,
      customerId,
    });
    return customerId;
  }
}
