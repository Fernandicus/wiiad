import { UniqId } from "@/src/common/domain/UniqId";
import { IStripeRepo } from "../domain/interfaces/IStripeRepo";
import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";

export class RemovePM {
  constructor(private repo: IStripeRepo) {}

  async remove(params: {
    userId: UniqId;
    pm: PaymentMethodId;
  }): Promise<void> {
    await this.repo.removePM(params);
  }
}
