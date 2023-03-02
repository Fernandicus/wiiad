import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { campaignMetricsHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import { reqBodyParse } from "@/src/utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  try {
    const { campaignId } = reqBodyParse(req);

    await MongoDB.connectAndDisconnect(async () => {
      await campaignMetricsHandler.increaseViews(campaignId);
    });

    return res.status(200).json({});
  } catch (err) {
    
    return res.status(400);
  }
}
