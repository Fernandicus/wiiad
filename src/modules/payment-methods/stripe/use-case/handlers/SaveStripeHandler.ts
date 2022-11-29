import { UniqId } from "@/src/utils/UniqId";
import { CustomerId } from "../../domain/value-objects/CustomerId";
import { Stripe } from "../../domain/Stripe";
import { SaveStripe } from "../SaveStripe";

interface IStripeCustomerPrimitives {
  id: string;
  userId: string;
  customerId: string;
}

export class SaveStripeHandler {
  constructor(private saveStripeCustomer: SaveStripe) {}

  async save({
    id,
    userId,
    customerId,
  }: IStripeCustomerPrimitives): Promise<void> {
    const stripePaymentMethod = new Stripe({
      id: new UniqId(id),
      userId: new UniqId(userId),
      customerId: new CustomerId(customerId),
      paymentMethods: [],
    });
    await this.saveStripeCustomer.save(stripePaymentMethod);
  }
}
