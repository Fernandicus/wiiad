//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment

import { StripeCampaignPaymentController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripePaymentController";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export interface IApiStripePaymentWithPMethod {
  paymentMethod: string;
  budgetItem: number;
  adId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = userSession.getFromServer({ req, res });
  const body: IApiStripePaymentWithPMethod = reqBodyParse(req);
  
  if (req.method !== "PUT" || !session || !body.adId || !body.paymentMethod)
    return res.status(400).end();

  try {
    await MongoDB.connectAndDisconnect(async () => {
      const controller = await StripeCampaignPaymentController.validate({
        adId: body.adId,
        session,
      });
      await controller.payWithPaymentMethod({
        budgetItem: body.budgetItem,
        paymentMethod: body.paymentMethod,
      });
    });
    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
}
