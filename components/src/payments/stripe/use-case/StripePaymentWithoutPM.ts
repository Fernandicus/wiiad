import {
  IPaymentWithoutPMParams,
  IPaymentWithPMParams,
  IStripeApiCalls,
} from "../domain/interfaces/StripeApiCalls";

export class StripePaymentWithoutPM {
  constructor(private apiCall: IStripeApiCalls) {}

  async withoutPaymentMethod(params: IPaymentWithoutPMParams): Promise<void> {
    await this.apiCall.payWithoutPMethod(params);
  }
}
