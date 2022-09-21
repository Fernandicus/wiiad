import { AdFinderController } from "@/src/ad/controller/AdFinderController";
import { AdvertiserId } from "@/src/ad/domain/ValueObjects/AdvertiserId";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";
import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { FindAds } from "@/src/ad/use-case/FindAds";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  //TODO: AVOID USING QUERY TO CATCH ADVERTISER ID,
  //TODO: Use getToken({req}) to get advertiser/user id
  const { advertiserId } = req.query;
  if (advertiserId === undefined || typeof advertiserId !== "string")
    return res.status(400);

  try {
    const adRepository = await MongoDB.adRepository();

    const adFinderController = new AdFinderController(
      advertiserId,
      adRepository
    );
    const adsFound = await adFinderController.findAllToJSON();
    await MongoDB.disconnect();

    return res.status(200).json({ ads: adsFound });
  } catch (err) {
    return res.status(400);
  }
}
