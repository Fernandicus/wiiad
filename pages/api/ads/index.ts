import { AdFinderHandler } from "@/src/ad/handler/AdFinderHandler";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { FindAds } from "@/src/ad/use-case/FindAds";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  const reqBody: { id: string } = req.body;

  try {
    const adRepository = await MongoDB.adRepository();
    const findAds = new FindAds(adRepository);

    const adFinderHandler = new AdFinderHandler(findAds);
    const adsFound = await adFinderHandler.findAllToJSON(reqBody.id);

    await MongoDB.disconnect();

    return res.status(200).json({ ads: adsFound });
  } catch (err) {
    return res.status(400);
  }
}
