import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { UniqId } from "@/src/utils/UniqId";

export class FakeStripe extends Stripe {
  static create(userId: UniqId): Stripe {
    return new Stripe({
      id: UniqId.new(),
      userId,
      customerId: this.generateCustomerId(),
    });
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

  private static generateCustomerId(): CustomerId {
    const customerId = "cus_" + UniqId.generate();
    return new CustomerId(customerId);
  }
}
