import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";

//? Payment Methods for Testing: https://stripe.com/docs/testing?testing-method=payment-methods#cards

type TestingPaymentMethods = "pm_card_visa" | "pm_card_visa_debit" | "pm_card_mastercard_prepaid"

export class FakePaymentMethodId extends PaymentMethodId {
  constructor(id: string) {
    super(id);
  }

  
  static create(): FakePaymentMethodId {
    return new FakePaymentMethodId("pm_card_visa");
  }

  static noExist(): FakePaymentMethodId {
    return new FakePaymentMethodId("pm_[no-exist]");
  }

  checkIfNotExsits(): boolean {
    return this.id.includes("[no-exist]");
  }
}
