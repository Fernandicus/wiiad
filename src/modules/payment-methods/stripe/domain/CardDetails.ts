import { PaymentMethodId } from "./value-objects/PaymentMethodId";
import { CardBrand } from "./value-objects/CardBrand";
import { ExpMonth } from "./value-objects/ExpMonth";
import { ExpYear } from "./value-objects/ExpYear";
import { Last4 } from "./value-objects/Last4";

export interface ICardDetailsPrimitives {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  paymentMethodId: string;
}

export interface ICardDetailsParams {
  brand: CardBrand;
  last4: Last4;
  expMonth: ExpMonth;
  expYear: ExpYear;
  paymentMethodId: PaymentMethodId;
}

export class CardDetails {
  readonly brand;
  readonly last4;
  readonly expMonth;
  readonly expYear;
  readonly paymentMethodId;

  constructor({
    brand,
    last4,
    expMonth,
    expYear,
    paymentMethodId,
  }: ICardDetailsParams) {
    this.brand = brand;
    this.last4 = last4;
    this.expMonth = expMonth;
    this.expYear = expYear;
    this.paymentMethodId = paymentMethodId;
  }

  toPrimitives(): ICardDetailsPrimitives {
    return {
      brand: this.brand.brand,
      last4: this.last4.digits,
      expMonth: this.expMonth.month,
      expYear: this.expYear.year,
      paymentMethodId: this.paymentMethodId.id,
    };
  }
}
