import { AdFinderHandler } from "@/src/ad/handler/AdFinderHandler";
import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { FindAds } from "@/src/ad/use-case/FindAds";
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
    const findAds = new FindAds(adRepository);

    const adFinderHandler = new AdFinderHandler(findAds);
    const adsFound = await adFinderHandler.findAllToJSON(token.id);

    await MongoDB.disconnect();

    return res.status(200).json({ ads: adsFound });
  } catch (err) {
    return res.status(400);
  }
}
