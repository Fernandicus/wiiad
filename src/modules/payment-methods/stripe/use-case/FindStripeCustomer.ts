import { UniqId } from "@/src/utils/UniqId";
import { ErrorFindingStripe } from "../domain/ErrorFindingStripe";
import { IStripeRepo } from "../domain/IStripeRepo";
import { Stripe } from "../domain/Stripe";

export class FindStripeCustomer {
  constructor(private stripeRepo: IStripeRepo) {}

  async findByUserId(id: UniqId): Promise<Stripe> {
    const stripeFound = await this.stripeRepo.findByUserId(id);
    if (!stripeFound)
      throw new ErrorFindingStripe("Stripe user id account doesn't found");
    return stripeFound;
  }
}
