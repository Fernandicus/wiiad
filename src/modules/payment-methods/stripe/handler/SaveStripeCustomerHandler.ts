import { UniqId } from "@/src/utils/UniqId";
import { CustomerId } from "../domain/CustomerId";
import { Stripe } from "../domain/Stripe";
import { SaveStripeCustomer } from "../use-case/SaveStripeCustomer";

interface IStripeCustomerPrimitives {
  id: string;
  userId: string;
  customerId: string;
}

export class SaveStripeCustomerHandler {
  constructor(private saveStripeCustomer: SaveStripeCustomer) {}

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
