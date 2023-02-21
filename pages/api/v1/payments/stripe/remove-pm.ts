import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { StripeRemovePMController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripeRemovePMController";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export interface IApiReqRemovePaymentMethod {
  pmId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResp>
) {
  if (req.method !== "DELETE")
    return res.status(400).json({ message: "Bad request" });

  const session = userSession.getFromServer({ req, res });
  if (!session) return res.status(400).json({ message: "No session provided" });

  const body = reqBodyParse(req) as IApiReqRemovePaymentMethod;
  if (!body.pmId)
    return res.status(400).json({ message: "No payment method provided" });

  try {
    const controller = new StripeRemovePMController();
    await MongoDB.connectAndDisconnect(async () => {
      await controller.removePM({ userId: session.id, pmId: body.pmId });
    });
    return res.status(200).json({ message: "Payment Method removed!" });
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
