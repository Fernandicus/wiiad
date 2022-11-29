import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { RemoveAdController } from "@/src/modules/ad/infraestructure/controllers/RemoveAdController";
import { ErrorRemovingAd } from "@/src/modules/ad/domain/errors/ErrorRemovingAd";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(400);

  try {
    const adId: string =
      typeof req.body !== "object" ? JSON.parse(req.body).adId : req.body.adId;
    if (!adId) throw new ErrorRemovingAd("Ad id is mandatory");

    await MongoDB.connectAndDisconnect(
      async () => await RemoveAdController.remove({ req, res }, adId)
    );

    res.status(200).json({});
    return;
  } catch (err) {
    res.status(400).json({});
    return;
  }
}
