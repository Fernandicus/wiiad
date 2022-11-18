import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { ICardDetailsPrimitives } from "../domain/CardDetails";
import { IPaymentDetailsPrimitives } from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/PaymentIntentId";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { GetPaymentDetails } from "../use-case/GetPaymentDetails";

export class GetPaymentDetailsHandler {
  constructor(private getDetails: GetPaymentDetails) {}

  async fromPaymentIntent(
    id: string
  ): Promise<IPaymentDetailsPrimitives> {
    const intentId = new PaymentIntentId(id);
    const details = await this.getDetails.fromPaymentIntent(intentId);
    return details.toPrimitives();
  }

  async fromPaymentMethod(
    id: string
  ): Promise<ICardDetailsPrimitives> {
    const methodId = new PaymentMethodId(id);
    const details = await this.getDetails.fromPaymentMethod(methodId);
    return details.toPrimitives();
  }
}
