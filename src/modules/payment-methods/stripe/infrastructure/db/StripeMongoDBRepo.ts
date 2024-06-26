import { UniqId } from "@/src/common/domain/UniqId";
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
import { ErrorFindingStripe } from "../../domain/errors/ErrorFindingStripe";

export class StripeMongoDBRepo implements IStripeRepo {
  async removePM(params: {
    userId: UniqId;
    pm: PaymentMethodId;
  }): Promise<void> {
    const { pm, userId } = params;
    await StripeModel.updateOne(
      { userId: userId.id },
      {
        $pull: {
          paymentMethods: { paymentMethodId: pm.id } as ICardDetailsPrimitives,
        },
      }
    );
  }

  async save(stripe: Stripe): Promise<void> {
    await StripeModel.create({
      ...stripe.toPrimitives(),
      _id: stripe.id.id,
    } as IStripeModel);
  }

  async findByUserId(userId: UniqId): Promise<Stripe> {
    const stripeModel = await StripeModel.findOne<IStripeModel>({
      userId: userId.id,
    } as IStripeModel);

    if (!stripeModel) throw ErrorFindingStripe.byUserId(userId.id);

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
