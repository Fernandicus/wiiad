import { CardDetails, ICardDetailsPrimitives } from "../../domain/CardDetails";
import { IStripeMetadata } from "../../domain/interfaces/IStripeMetadata";
import {
  findCustomerHandler,
  paymentSucceeded,
  updateStripeHandler,
} from "../stripe-container";
import { IValidatedPaymentData } from "../StripePayments";

export class StripeCampaignPaymentSuccessController {
  private constructor(readonly paymentData: IValidatedPaymentData) {}

  static async validateWebhook(params: {
    stripeSig: string | Buffer | string[];
    payload: string | Buffer;
  }): Promise<StripeCampaignPaymentSuccessController> {
    const paymentData = await paymentSucceeded.validateWebhook({
      header: params.stripeSig,
      payload: params.payload,
    });
    return new StripeCampaignPaymentSuccessController(paymentData);
  }

  async savePaymentMethod(): Promise<void> {
    const { card, metadata } = this.paymentData;

    const savedMethod = await this.findCustomerPMethod(this.paymentData);

    if (!savedMethod && card.paymentMethodId.id) {
      await updateStripeHandler.saveCardDetails(
        metadata.advertiserId,
        card.toPrimitives()
      );
    }
  }

  private async findCustomerPMethod(params: {
    card: CardDetails;
    metadata: IStripeMetadata;
  }): Promise<ICardDetailsPrimitives | undefined> {
    const stripeCustomer = await findCustomerHandler.ByUserId(
      params.metadata.advertiserId
    );
    const savedMethod = stripeCustomer.paymentMethods.find(
      (method) => method.paymentMethodId == params.card.paymentMethodId.id
    );
    return savedMethod;
  }
}
