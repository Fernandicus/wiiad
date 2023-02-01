import {
  IPaymentWithoutPMParams,
  IPaymentWithPMParams,
  IClientSecret,
  IStripeApiCalls,
} from "../domain/interfaces/StripeApiCalls";

export class PayWithStripe {
  constructor(private apiCall: IStripeApiCalls) {}

  async withPaymentMethod(params: IPaymentWithPMParams): Promise<void> {
    await this.apiCall.payWithPMethod(params);
  }

  async withoutPaymentMethod(
    params: IPaymentWithoutPMParams
  ): Promise<IClientSecret> {
    return await this.apiCall.payWithoutPMethod(params);
  }
}
