import { UniqId } from "@/src/utils/UniqId";
import { GenericUser } from "@/src/domain/IGenericUser";
import { CustomerId } from "./CustomerId";
import { PaymentMethodId } from "./PaymentMethodId";

export interface IStripePrimitives {
  id: string;
  userId: string;
  customerId: string;
  paymentMethods: string[];
}

interface IStripeParams {
  id: UniqId;
  userId: UniqId;
  customerId: CustomerId;
  paymentMethods: PaymentMethodId[];
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
      paymentMethods: this.paymentMethods.map(method=> method.id),
    };
  }
}
