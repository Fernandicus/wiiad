import { UniqId } from "@/src/common/domain/UniqId";
import { ErrorFindingStripe } from "../domain/errors/ErrorFindingStripe";
import { IStripeRepo } from "../domain/interfaces/IStripeRepo";
import { Stripe } from "../domain/Stripe";

export class FindStripeCustomer {
  constructor(private stripeRepo: IStripeRepo) {}

  async byUserId(id: UniqId): Promise<Stripe> {
    const stripeFound = await this.stripeRepo.findByUserId(id);
    return stripeFound;
  }
}
