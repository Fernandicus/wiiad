import { StripeClientSecret } from "@/src/modules/payment-methods/stripe/domain/value-objects/StripeClientSecret";
import { IStripeApiCalls } from "../domain/interfaces/StripeApiCalls";

export class SetupIntentClientSecret {
  constructor(private apiCall: IStripeApiCalls) {}

  async get(): Promise<StripeClientSecret> {
    return await this.apiCall.setupIntent();
  }
}
