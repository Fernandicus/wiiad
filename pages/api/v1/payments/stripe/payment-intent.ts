//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment

import { StripePaymentController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripePaymentController";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";

export interface IApiPaymentIntent {
  paymentMethod?: string;
  budgetItem: number;
  adId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(400).end();

  const session = userSession.getFromServer({ req, res });
  if (!session) return res.status(400).end();

  const { paymentMethod, budgetItem, adId }: IApiPaymentIntent =
    reqBodyParse(req);

  if (!adId) return res.status(400).end();

  try {
    const amount = PaymentAmount.fromItem(budgetItem);

    const adFound = await adFinderHandler.findByAdId(adId);
    if (adFound.advertiserId !== session.id)
      throw new Error(
        `Advertise '${adId}' not found for the user '${session.id}'`
      );

    if (!paymentMethod) {
      const paymentDetails = await MongoDB.connectAndDisconnect(async () => {
        const details =
          await StripePaymentController.paymentWithoutPaymentMethod({
            userId: session!.id,
            amount: amount.amount,
            metadata: { adId, advertiserId: session!.id },
          });
        return details;
      });
      return res
        .status(200)
        .json({ clientSecret: paymentDetails.clientSecret });
    } else {
      await MongoDB.connectAndDisconnect(async () => {
        await StripePaymentController.paymentWithPaymentMethod({
          userId: session!.id,
          paymentMethodId: paymentMethod,
          amount: amount.amount,
          metadata: { adId, advertiserId: session!.id },
        });
      });
      return res.status(200).end();
    }
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
}
