import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { RemoveAdController } from "@/src/modules/ad/controller/RemoveAdController";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(400);

  try {
    const adId: string =
      typeof req.body !== "object" ? JSON.parse(req.body).adId : req.body.adId;

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
