import { UniqId } from "@/src/utils/UniqId";
import { ErrorFindingStripe } from "../domain/errors/ErrorFindingStripe";
import { IStripeRepo } from "../domain/interfaces/IStripeRepo";
import { Stripe } from "../domain/Stripe";

export class FindStripeCustomer {
  constructor(private stripeRepo: IStripeRepo) {}

  async findByUserId(id: UniqId): Promise<Stripe> {
    const stripeFound = await this.stripeRepo.findByUserId(id);
    if (!stripeFound) throw ErrorFindingStripe.byUserId(id.id);
    return stripeFound;
  }
}
