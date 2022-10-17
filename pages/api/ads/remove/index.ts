import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { adRemoverHandler } from "@/src/modules/ad/ad-container";
import { userSession } from "@/src/use-case/container";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(400);

  try {
    const adId: string =
      typeof req.body !== "object" ? JSON.parse(req.body).adId : req.body.adId;
    if (!adId) return res.status(400);

    const session = userSession.getFromServer({ req });
    if (!session) return res.status(400).json({ message: "No auth" });

    await MongoDB.connect();
    await adRemoverHandler.remove(adId);
    await MongoDB.disconnect();
    res.status(200).json({});
    return;
  } catch (err) {
    res.status(400).json({});
    return;
  }
}
