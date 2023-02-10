import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { ApiCallGetCardDetails } from "../ApiCallGetCardDetails";

export class ApiCallGetCardDetailsHandler {
  constructor(private getCardDetails: ApiCallGetCardDetails) {}

  async getDetails(pmId: string): Promise<ICardDetailsPrimitives> {
    const id = new PaymentMethodId(pmId);
    const details = await this.getCardDetails.getDetails(id);
    return details.toPrimitives();
  }
}
