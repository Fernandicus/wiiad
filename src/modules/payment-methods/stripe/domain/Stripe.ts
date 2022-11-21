import { UniqId } from "@/src/utils/UniqId";
import { GenericUser } from "@/src/domain/IGenericUser";
import { CustomerId } from "./CustomerId";
import { PaymentMethodId } from "./value-objects/PaymentMethodId";
import { CardDetails, ICardDetailsPrimitives } from "./CardDetails";

export interface IStripePrimitives {
  id: string;
  userId: string;
  customerId: string;
  paymentMethods: ICardDetailsPrimitives[];
}

interface IStripeParams {
  id: UniqId;
  userId: UniqId;
  customerId: CustomerId;
  paymentMethods: CardDetails[];
}

export class Stripe {
  readonly id;
  readonly userId;
  readonly customerId;
  readonly paymentMethods;

  constructor({ id, userId, customerId, paymentMethods }: IStripeParams) {
    this.id = id;
    this.userId = userId;
    this.customerId = customerId;
    this.paymentMethods = paymentMethods;
  }

  toPrimitives(): IStripePrimitives {
    return {
      id: this.id.id,
      userId: this.userId.id,
      customerId: this.customerId.id,
      paymentMethods: this.paymentMethods.map((method) => {
        return {
          paymentMethodId: method.paymentMethodId.id,
          brand: method.brand.brand,
          expMonth: method.expMonth.month,
          expYear: method.expYear.year,
          last4: method.last4.digits,
        };
      }),
    };
  }
}
