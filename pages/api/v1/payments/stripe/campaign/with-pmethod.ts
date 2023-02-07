//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment

import { StripeCampaignPaymentController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripeCampaignPaymentController";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";

export interface IApiReqStripePaymentWithPMethod {
  paymentMethod: string;
  budgetItem: number;
  adId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResp>
) {
  const session = userSession.getFromServer({ req, res });
  const body: IApiReqStripePaymentWithPMethod = reqBodyParse(req);
  if (req.method !== "PUT" || !session || !body.adId || !body.paymentMethod)
    return res
      .status(400)
      .json({ message: "Bad request or bad params provided" });

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
    return res.status(200).json({ message: "Payment Succeed!" });
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
