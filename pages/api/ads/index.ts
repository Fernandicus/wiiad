import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import { userSession } from "@/src/use-case/container";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  try {

    const session = userSession.getFromServer({ req });
    
    if (!session) return res.status(400).json({ message: "No auth" });

    await MongoDB.connect();
    
    const adsFound = await adFinderHandler.findAll(session.id);

    await MongoDB.disconnect();

    return res.status(200).json({ ads: adsFound });
  } catch (err) {
    return res.status(400);
  }
}
