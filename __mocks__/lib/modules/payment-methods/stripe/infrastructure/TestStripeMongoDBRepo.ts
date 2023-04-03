import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import {
  IStripeModel,
  StripeModel,
} from "@/src/modules/payment-methods/stripe/infrastructure/db/StripeModel";
import { UniqId } from "@/src/common/domain/UniqId";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestStripeRepository } from "../domain/TestStripeRepository";
import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { CardBrand } from "@/src/modules/payment-methods/stripe/domain/value-objects/CardBrand";
import { ExpMonth } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpMonth";
import { ExpYear } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpYear";
import { Last4 } from "@/src/modules/payment-methods/stripe/domain/value-objects/Last4";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";

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
    await TestMongoDB.connectMongoDB();
    await StripeModel.create({
      ...stripe.toPrimitives(),
      _id: stripe.id,
    });
  }

  async getByUserId(userId: UniqId): Promise<any> {
    await TestMongoDB.connectMongoDB();
    const stripeModel = await StripeModel.findOne<IStripeModel>({
      userId: userId.id,
    } as IStripeModel);
    if (!stripeModel) return null;
    return this.toStripe(stripeModel);
  }

  async getAllUsers(): Promise<Stripe[] | null> {
    await TestMongoDB.connectMongoDB();
    const stripeModels = await StripeModel.find<IStripeModel>();
    if (stripeModels.length == 0) return null;
    return stripeModels.map((model) => this.toStripe(model));
  }

  async saveMany(stripes: Stripe[]): Promise<void> {
    await TestMongoDB.connectMongoDB();
    const stripeModels: IStripeModel[] = stripes.map((s) => {
      return {
        ...s.toPrimitives(),
        _id: s.id.id,
      };
    });
    await StripeModel.insertMany(stripeModels);
  }

  private toStripe(model: IStripeModel): Stripe {
    return new Stripe({
      id: new UniqId(model._id),
      userId: new UniqId(model.userId),
      customerId: new CustomerId(model.customerId),
      paymentMethods: model.paymentMethods.map(
        (pm) =>
          new CardDetails({
            paymentMethodId: new PaymentMethodId(pm.paymentMethodId),
            brand: new CardBrand(pm.brand),
            expMonth: new ExpMonth(pm.expMonth),
            expYear: new ExpYear(pm.expYear),
            last4: new Last4(pm.last4),
          })
      ),
    });
  }
}
