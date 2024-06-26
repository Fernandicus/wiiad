import { PaymentAmount } from "./value-objects/PaymentAmount";
import { PaymentIntentId } from "./value-objects/PaymentIntentId";
import { PaymentMethodId } from "./value-objects/PaymentMethodId";
import { StripeClientSecret } from "./value-objects/StripeClientSecret";

export interface IPaymentDetailsPrimitives {
  id: string;
  amount: number;
  paymentMethodId?: string;
  clientSecret: string;
}

export interface IPaymentDetailsParams {
  id: PaymentIntentId;
  amount: PaymentAmount;
  paymentMethodId?: PaymentMethodId;
  clientSecret: StripeClientSecret;
}

export class PaymentDetails {
  readonly id;
  readonly amount;
  readonly paymentMethodId;
  readonly clientSecret;

  constructor({
    id,
    amount,
    paymentMethodId,
    clientSecret,
  }: IPaymentDetailsParams) {
    this.id = id;
    this.amount = amount;
    this.paymentMethodId = paymentMethodId;
    this.clientSecret = clientSecret;
  }

  toPrimitives(): IPaymentDetailsPrimitives {
    return {
      id: this.id.id,
      amount: this.amount.amount,
      paymentMethodId: this.paymentMethodId?.id,
      clientSecret: this.clientSecret.secret,
    };
  }
}
