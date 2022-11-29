import { ICardDetailsPrimitives } from "../../domain/CardDetails";
import { IPaymentDetailsPrimitives } from "../../domain/PaymentDetails";
import { PaymentIntentId } from "../../domain/value-objects/PaymentIntentId";
import { PaymentMethodId } from "../../domain/value-objects/PaymentMethodId";
import { GetPaymentDetails } from "../GetPaymentDetails";

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
