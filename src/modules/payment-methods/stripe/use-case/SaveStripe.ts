import { IStripeRepo } from "../domain/interfaces/IStripeRepo";
import { Stripe } from "../domain/Stripe";

export class SaveStripe {
  constructor(private repo: IStripeRepo) {}

  async save(stripe: Stripe): Promise<void> {
    await this.repo.save(stripe);
  }
}
