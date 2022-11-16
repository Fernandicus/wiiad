import { UniqId } from "@/src/utils/UniqId";
import { IStripePrimitives } from "../domain/Stripe";
import { FindStripeCustomer } from "../use-case/FindStripeCustomer";

export class FindStripeCustomerHandler {
  constructor(private findStripeCustomer: FindStripeCustomer) {}

  async findByUserId(id : string ): Promise<IStripePrimitives> {
    const userId = new UniqId(id);
    const stripeCustomer = await this.findStripeCustomer.findByUserId(userId);
    return stripeCustomer.toPrimitives();
  }
}
