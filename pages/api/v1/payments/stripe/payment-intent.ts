//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment


import { StripePaymentController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripePaymentController";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

interface IApiPaymentIntent {
  paymentMethod: string;
  budgetItem: number;
  adId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") res.status(400).end();

  const session = userSession.getFromServer({ req, res });
  if (!session) res.status(400).end();

  const { paymentMethod, budgetItem, adId }: IApiPaymentIntent =
    reqBodyParse(req);

  console.log({ paymentMethod, budgetItem, adId });

  try {
    const amount = PaymentAmount.fromItem(budgetItem);

    if (!amount.isValidAmount())
      throw new Error("La cantidad a pagar no es valida");

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

      res.status(200).json({ clientSecret: paymentDetails.clientSecret });
    } else {
      await MongoDB.connectAndDisconnect(async () => {
        const paymentDetails =
          await StripePaymentController.paymentWithPaymentMethod({
            userId: session!.id,
            paymentMethodId: paymentMethod,
            amount: amount.amount,
            metadata: { adId, advertiserId: session!.id },
          });
        return paymentDetails;
      });
      res.status(200).end();
    }
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
}
