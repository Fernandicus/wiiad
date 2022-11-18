import { UniqId } from "@/src/utils/UniqId";
import { PaymentMethodId } from "./PaymentMethodId";

export interface ICardDetailsPrimitives {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  paymentMethodId: string;
}

interface ICardDetailsParams {
  id: UniqId;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  paymentMethodId: PaymentMethodId;
}

export class CardDetails {
  readonly id;
  readonly brand;
  readonly last4;
  readonly expMonth;
  readonly expYear;
  readonly paymentMethodId;

  constructor({
    id,
    brand,
    last4,
    expMonth,
    expYear,
    paymentMethodId,
  }: ICardDetailsParams) {
    this.id = id;
    this.brand = brand;
    this.last4 = last4;
    this.expMonth = expMonth;
    this.expYear = expYear;
    this.paymentMethodId = paymentMethodId;
  }

  toPrimitives(): ICardDetailsPrimitives {
    return {
      id: this.id.id,
      brand: this.brand,
      last4: this.last4,
      expMonth: this.expMonth,
      expYear: this.expYear,
      paymentMethodId: this.paymentMethodId.id,
    };
  }
}
