import { AdRemoverHandler } from "@/src/ad/handler/AdRemoverHandler";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { RemoveAd } from "@/src/ad/use-case/RemoveAd";
import { NextApiRequest, NextApiResponse } from "next";


export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(400);
  if (req.body.adId === null || req.body.adId === undefined)
    return res.status(400);

  const adId: string = req.body.adId;

  try {
    const adRepository = await MongoDB.adRepository();
    const removeAd = new RemoveAd(adRepository);

    const adRemoverHandler = new AdRemoverHandler(removeAd);
    await adRemoverHandler.remove(adId);

    res.status(200);
    return;
  } catch (err) {
    res.status(400).json({});
    return;
  }
}
