import { UniqId } from "@/src/utils/UniqId";
import { CustomerId } from "../domain/CustomerId";
import { IStripeRepo } from "../domain/IStripeRepo";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { Stripe } from "../domain/Stripe";
import { IStripeModel, StripeModel } from "./StripeModel";

export class StripeMongoDBRepo implements IStripeRepo {
  async save(stripe: Stripe): Promise<void> {
    await StripeModel.create({
      ...stripe.toPrimitives(),
      _id: stripe.id.id,
    } as IStripeModel);
  }

  async findByUserId(userId: UniqId): Promise<Stripe | null> {
    const stripeModel = await StripeModel.findOne<IStripeModel>({
      userId: userId.id,
    } as IStripeModel);
    if (!stripeModel) return null;
    return new Stripe({
      id: new UniqId(stripeModel._id),
      userId: new UniqId(stripeModel.userId),
      customerId: new CustomerId(stripeModel.customerId),
      paymentMethods: stripeModel.paymentMethods.map(
        (method) => new PaymentMethodId(method)
      ),
    });
  }

  async updatePaymentMethod(params: {
    userId: UniqId;
    paymentMethod: PaymentMethodId;
  }): Promise<void> {
    await StripeModel.updateOne<IStripeModel>(
      {
        userId: params.userId.id,
      } as IStripeModel,
      { $addToSet: { paymentMethods: params.paymentMethod.id } }
    );
  }
}
