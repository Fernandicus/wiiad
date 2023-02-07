import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { StripeSetupIntentController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripeSetupIntentController";
import { ISetupIntent } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { ISetupIntentPrimitives } from "@/src/modules/payment-methods/stripe/use-case/handlers/SetupIntentHandler";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export interface IApiRespSetupIntent extends IApiResp<ISetupIntentPrimitives> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiRespSetupIntent>
) {
  console.log("session");
  if (req.method !== "GET")
    return res.status(400).json({ message: "Bad request" });

  const session = userSession.getFromServer({ req, res });
  if (!session) return res.status(400).json({ message: "No session provided" });
  try {
    const controller = new StripeSetupIntentController();
    const setupIntent = await MongoDB.connectAndDisconnect(async () => {
      return controller.create(session.id);
    });
    return res.status(200).json({
      message: "Setup Intent",
      data: { ...setupIntent },
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({
        message: err.message,
      });
  }
}
