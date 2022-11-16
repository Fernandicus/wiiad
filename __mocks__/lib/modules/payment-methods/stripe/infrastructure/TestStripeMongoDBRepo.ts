import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/CustomerId";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import {
  IStripeModel,
  StripeModel,
} from "@/src/modules/payment-methods/stripe/infrastructure/StripeModel";
import { UniqId } from "@/src/utils/UniqId";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestStripeRepository } from "../domain/TestStripeRepository";

export class TestStripeMongoDBRepo
  extends TestMongoDB
  implements TestStripeRepository
{
  static async init(): Promise<TestStripeMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(StripeModel.modelName, StripeModel.schema)
    );
    return new TestStripeMongoDBRepo();
  }

  async save(stripe: Stripe): Promise<void> {
    await StripeModel.create({
      ...stripe.toPrimitives(),
      _id: stripe.id,
    });
  }

  async getByUserId(userId: UniqId): Promise<any> {
    const stripeModel = await StripeModel.findOne<IStripeModel>({
      userId: userId.id,
    } as IStripeModel);
    if (!stripeModel) return null;
    return new Stripe({
      id: new UniqId(stripeModel._id),
      userId: new UniqId(stripeModel.userId),
      customerId: new CustomerId(stripeModel.customerId),
    });
  }
}
