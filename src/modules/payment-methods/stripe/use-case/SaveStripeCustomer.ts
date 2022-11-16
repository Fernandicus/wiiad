import { IStripeRepo } from "../domain/IStripeRepo";
import { Stripe } from "../domain/Stripe";

export class SaveStripeCustomer {
  constructor(private repo: IStripeRepo) {}

  async save(stripe: Stripe): Promise<void> {
    await this.repo.save(stripe);
  }
}
