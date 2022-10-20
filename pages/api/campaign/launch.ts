import { createCampaignHandler } from "@/src/modules/campaign/container";
import { userSession } from "@/src/use-case/container";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).json({});

  const adId = req.body.adId;
  if (!adId) return res.status(400).json({ message: "Missing ad id" });

  const session = userSession.getFromServer({ req, res });
  if (!session) return res.status(400).json({ message: "Missing ad id" });

  await createCampaignHandler.launch({ advertiserId: session.id, adId });

  try {
    return res.status(200).json({});
  } catch (err) {
    return res.status(400).json({});
  }
}
