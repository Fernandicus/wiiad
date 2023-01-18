import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { faker } from "@faker-js/faker";

export class FakeCustomerId extends CustomerId {
  constructor(id: string) {
    super(id);
  }

  static create(): FakeCustomerId {
    return new FakeCustomerId("cus_" + faker.random.numeric(5));
  }

  static noExist(): FakeCustomerId {
    return new FakeCustomerId("cus_[no-exist]");
  }

  checkIfNotExsits(): boolean {
    return this.id.includes("[no-exist]");
  }
}
