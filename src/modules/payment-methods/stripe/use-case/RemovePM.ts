import { UniqId } from "@/src/utils/UniqId";
import { IStripeRepo } from "../domain/interfaces/IStripeRepo";
import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";
import { StripePayments } from "../infrastructure/StripePayments";

export class RemovePM {
  constructor(private repo: IStripeRepo) {}

  async remove(params: {
    userId: UniqId;
    pm: PaymentMethodId;
  }): Promise<void> {
    await this.repo.removePM(params);
  }
}
