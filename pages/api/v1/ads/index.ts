import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { ErrorFindingAd } from "@/src/modules/ad/domain/errors/ErrorFindingAd";
import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  try {
    const session = userSession.getFromServer({ req, res });
    if (!session) throw new ErrorFindingAd("No Auth");

    const adsFound = await MongoDB.connectAndDisconnect(
      async () => await adFinderHandler.findAll(session.id)
    );
    return res.status(200).json({ ads: adsFound });
  } catch (err) {
    return res.status(400);
  }
}
