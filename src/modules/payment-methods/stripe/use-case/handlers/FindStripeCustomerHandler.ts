import { UniqId } from "@/src/utils/UniqId";
import { IStripePrimitives } from "../../domain/Stripe";
import { FindStripeCustomer } from "../FindStripeCustomer";

export class FindStripeCustomerHandler {
  constructor(private findStripeCustomer: FindStripeCustomer) {}

  async ByUserId(id : string ): Promise<IStripePrimitives> {
    const userId = new UniqId(id);
    const stripeCustomer = await this.findStripeCustomer.byUserId(userId);
    return stripeCustomer.toPrimitives();
  }
}
