import { AdRemoverHandler } from "@/src/ad/handler/AdRemoverHandler";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { RemoveAd } from "@/src/ad/use-case/RemoveAd";
import { NextApiRequest, NextApiResponse } from "next";
import { adRemoverHandler } from "@/src/ad/ad-container";


export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(400);
  if (req.body.adId === null || req.body.adId === undefined)
    return res.status(400);

  const adId: string = req.body.adId;

  try {
    await MongoDB.connect();
    await adRemoverHandler.remove(adId);
    await MongoDB.disconnect();
    res.status(200);
    return;
  } catch (err) {
    res.status(400).json({});
    return;
  }
}
