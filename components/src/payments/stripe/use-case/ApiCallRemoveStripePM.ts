import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { IStripeApiCalls } from "../domain/interfaces/StripeApiCalls";

export class ApiCallRemovePM {
  constructor(private apiCall: IStripeApiCalls) {}

  async remove(pm: PaymentMethodId): Promise<void> {
    await this.apiCall.removePM(pm);
  }
}
