import { AdFinderController } from "@/src/ad/controller/AdFinderController";
import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  const token = await getToken({ req });
  if (!token || token.rol === "user") {
    res.status(400).json({ message: "You must are not authorized" });
    return;
  }

  try {
    const adRepository = await MongoDB.adRepository();
    const adFinderController = new AdFinderController(token.id, adRepository);
    const adsFound = await adFinderController.findAllToJSON();
    await MongoDB.disconnect();

    return res.status(200).json({ ads: adsFound });
  } catch (err) {
    return res.status(400);
  }
}
