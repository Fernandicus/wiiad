import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { faker } from "@faker-js/faker";

export class FakePaymentMethodId extends PaymentMethodId {
  constructor(id: string) {
    super(id);
  }

  static create(): FakePaymentMethodId {
    return new FakePaymentMethodId("pm_" + faker.random.numeric(5));
  }

  static noExist(): FakePaymentMethodId {
    return new FakePaymentMethodId("pm_[no-exist]");
  }

  checkIfExsits(): boolean {
    return this.id.includes("[no-exist]");
  }
}
