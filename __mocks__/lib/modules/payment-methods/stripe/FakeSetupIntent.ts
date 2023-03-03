import { SetupIntentId } from "@/src/modules/payment-methods/stripe/domain/value-objects/SetupIntentId";
import { SetupIntent } from "@/src/modules/payment-methods/stripe/use-case/SetupIntent";

export class FakeSetupIntentId extends SetupIntentId {
  private constructor(id: string) {
    super(id);
  }
  static create(): FakeSetupIntentId {
    const num = Math.round(Math.random() * 10000);
    return new FakeSetupIntentId(`seti_${num}`);
  }
}
