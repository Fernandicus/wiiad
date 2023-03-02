import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { getPaymentDetailsHandler } from "@/src/modules/payment-methods/stripe/infrastructure/stripe-container";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { CloudConfig } from "@cloudinary/url-gen";
import { NextApiRequest, NextApiResponse } from "next";

export interface IApiRespGetCardDetails
  extends IApiResp<ICardDetailsPrimitives> {}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<IApiRespGetCardDetails>
) {
  if (req.method !== "GET")
    return res.status(400).json({ message: "Bad request" });

  const session = userSession.getFromServer({ req, res });

  if (!session) return res.status(400).json({ message: "No session provided" });

  const { pmId } = req.query as { pmId: string };
  
  if (!pmId)
    return res
      .status(400)
      .json({ message: "Missing payment method id query param" });

  try {
    const pDetails = await MongoDB.connectAndDisconnect(async () => {
      return await getPaymentDetailsHandler.fromPaymentMethod(pmId);
    });
    
    return res
      .status(200)
      .json({ message: "Card details found!", data: pDetails });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
