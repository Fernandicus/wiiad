import {
  IStripeParams,
  Stripe,
} from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { UniqId } from "@/src/utils/UniqId";
import { FakeCustomerId } from "./FakeCustomerId";

export class FakeStripe extends Stripe {
  constructor(params: IStripeParams) {
    super(params);
  }

  static create(userId: UniqId): Stripe {
    return new Stripe({
      id: UniqId.new(),
      userId,
      customerId: FakeCustomerId.create(),
      paymentMethods: [],
    });
  }

  static createMany(userIds: UniqId[]): Stripe[] {
    const stripes = userIds.map((id) => this.create(id));
    return stripes;
  }

  static createManyRandom(amount = 5): Stripe[] {
    const ids = Array(amount)
      .fill("")
      .map((e) => UniqId.new());
    const stripes = ids.map((id) => {
      return this.create(id);
    });
    return stripes;
  }

  static noExist(): FakeStripe {
    return new FakeStripe({
      id: UniqId.new(),
      userId: UniqId.new(),
      customerId: FakeCustomerId.noExist(),
      paymentMethods: [],
    });
  }

  checkIfNotExsits(): boolean {
    return this.customerId.id.includes("[no-exist]");
  }
}
