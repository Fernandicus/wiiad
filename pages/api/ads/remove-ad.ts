import { AdId } from "@/src/ad/domain/ValueObjects/AdId";
import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { RemoveAd } from "@/src/ad/use-case/RemoveAd";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(400);
  if (req.body.adId === null || req.body.adId === undefined) return res.status(400);

  const adId: string = req.body.adId;
  try {
    const adRepository = await MongoDB.adRepository();
    const removeAd = new RemoveAd(adRepository);
    await removeAd.byId(new AdId(adId));
    return res.status(200);
  } catch (err) {
    return res.status(400);
  }
}
