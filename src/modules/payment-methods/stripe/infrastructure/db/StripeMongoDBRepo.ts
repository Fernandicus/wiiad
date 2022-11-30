import { UniqId } from "@/src/utils/UniqId";
import { CustomerId } from "../../domain/value-objects/CustomerId";
import { IStripeRepo } from "../../domain/interfaces/IStripeRepo";
import { PaymentMethodId } from "../../domain/value-objects/PaymentMethodId";
import { Stripe } from "../../domain/Stripe";
import { IStripeModel, StripeModel } from "./StripeModel";
import { CardDetails, ICardDetailsPrimitives } from "../../domain/CardDetails";
import { CardBrand } from "../../domain/value-objects/CardBrand";
import { ExpMonth } from "../../domain/value-objects/ExpMonth";
import { ExpYear } from "../../domain/value-objects/ExpYear";
import { Last4 } from "../../domain/value-objects/Last4";

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
        (method) =>
          new CardDetails({
            paymentMethodId: new PaymentMethodId(method.paymentMethodId),
            brand: new CardBrand(method.brand),
            expMonth: new ExpMonth(method.expMonth),
            expYear: new ExpYear(method.expYear),
            last4: new Last4(method.last4),
          })
      ),
    });
  }

  async addNewCardDetails(params: {
    userId: UniqId;
    cardDetails: CardDetails;
  }): Promise<void> {
    const paymentDetails = params.cardDetails.toPrimitives();
    await StripeModel.updateOne<IStripeModel>(
      {
        userId: params.userId.id,
      } as IStripeModel,
      {
        $addToSet: {
          paymentMethods: {
            ...paymentDetails,
          } as ICardDetailsPrimitives,
        },
      }
    );
  }
}
