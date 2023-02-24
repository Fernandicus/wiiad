//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment

import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { StripeCampaignPaymentController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripePaymentController";

export interface IApiReqStripePaymentWithoutPMethod {
  budgetItem: number;
  adId: string;
}

export interface IApiRespStripePayWithoutPM
  extends IApiResp<{ clientSecret: string }> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiRespStripePayWithoutPM>
) {
  const session = userSession.getFromServer({ req, res });
  const body: IApiReqStripePaymentWithoutPMethod = reqBodyParse(req);

  if (req.method !== "PUT" || !session || !body.adId)
    return res.status(400).end();

  try {
    await MongoDB.connectAndDisconnect(async () => {
      const controller = await StripeCampaignPaymentController.validate({
        adId: body.adId,
        session,
      });

      const details = await controller.payWithoutPaymentMethod(body.budgetItem);

      return res.status(200).json({
        message: "Payment intent created!",
        data: { clientSecret: details.clientSecret },
      });
    });
  } catch (err) {
    
    if (err instanceof Error)
      return res.status(400).json({
        message: err.message,
      });
  }
}
