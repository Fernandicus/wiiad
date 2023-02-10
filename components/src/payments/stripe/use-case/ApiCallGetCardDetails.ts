import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { IStripeApiCalls } from "../domain/interfaces/StripeApiCalls";

export class ApiCallGetCardDetails {
  constructor(private apiCall: IStripeApiCalls) {}

  async getDetails(pmId: PaymentMethodId): Promise<CardDetails> {
    return await this.apiCall.getCardDetails(pmId);
  }
}
