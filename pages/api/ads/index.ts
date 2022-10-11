import { AdFinderHandler } from "@/src/ad/handler/AdFinderHandler";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { FindAds } from "@/src/ad/use-case/FindAds";
import { NextApiRequest, NextApiResponse } from "next";
import { adFinderHandler } from "@/src/ad/ad-container";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  const reqBody: { id: string } = req.body;

  try {
    await MongoDB.connect();
    
    const adsFound = await adFinderHandler.findAllToJSON(reqBody.id);

    await MongoDB.disconnect();

    return res.status(200).json({ ads: adsFound });
  } catch (err) {
    return res.status(400);
  }
}
