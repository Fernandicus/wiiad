import { PaymentIntentId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentIntentId";
import { faker } from "@faker-js/faker";


export class FakePaymentIntentId extends PaymentIntentId {
  constructor(id: string) {
    super(id);
  }

  static create(): FakePaymentIntentId {
    return new FakePaymentIntentId("pi_" + faker.random.numeric(5));
  }

  static noExist(): FakePaymentIntentId {
    return new FakePaymentIntentId("pi_[no-exist]");
  }

  checkIfNotExsits(): boolean {
    return this.id.includes("[no-exist]");
  }
}
