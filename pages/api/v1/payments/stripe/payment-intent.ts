//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment

import { StripePaymentController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripePaymentController";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export interface IApiPaymentIntent {
  paymentMethod?: string;
  budgetItem: number;
  adId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = userSession.getFromServer({ req, res });
  const body: IApiPaymentIntent = reqBodyParse(req);

  if (req.method !== "PUT" || !session || !body.adId)
    return res.status(400).end();

  try {
    const details = await MongoDB.connectAndDisconnect(async () => {
      return await StripePaymentController.pay({
        session,
        ...body,
      });
    });
    return res.status(200).json({ clientSecret: details.clientSecret });
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
}
