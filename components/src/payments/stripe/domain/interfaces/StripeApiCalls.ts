import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { UniqId } from "@/src/utils/UniqId";

export interface IPaymentWithoutPMParams {
  budgetItem: PricesPerClick;
  adId: UniqId;
}

export interface IPaymentWithPMParams extends IPaymentWithoutPMParams {
  paymentMethod: PaymentMethodId;
}

export interface IClientSecret {
  clientSecret: string;
}

export interface IStripeApiCalls {
  payWithoutPMethod(params: IPaymentWithoutPMParams): Promise<IClientSecret>;
  payWithPMethod(params: IPaymentWithPMParams): Promise<void>;
}
