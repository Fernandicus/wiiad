import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { StripeClientSecret } from "@/src/modules/payment-methods/stripe/domain/value-objects/StripeClientSecret";
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
  setupIntent():Promise<StripeClientSecret>;
  saveNewPaymentMethod(pm:PaymentMethodId):Promise<void>;
  getCardDetails(pm:PaymentMethodId):Promise<CardDetails>;
}
