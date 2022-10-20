import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { FindAdController } from "@/src/modules/ad/controller/FindAdController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  try {
    const adsFound = await MongoDB.connectAndDisconnect(
      async () => await FindAdController.findAll({ req, res })
    );

    await MongoDB.disconnect();

    return res.status(200).json({ ads: adsFound });
  } catch (err) {
    return res.status(400);
  }
}
