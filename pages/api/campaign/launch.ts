import { MongoDB } from "@/src/infrastructure/MongoDB";
import { LaunchCampaignController } from "@/src/modules/campaign/controller/LaunchCampaignController";
import { ErrorCreatingCampaign } from "@/src/modules/campaign/domain/value-objects/ErrorCreatingCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).json({});

  try {
    const adId: string = req.body.adId;
    if (!adId) throw new ErrorCreatingCampaign("Missing ad id");

    await MongoDB.connectAndDisconnect(async () =>
      LaunchCampaignController.launch({
        context: { req, res },
        adId,
        id: UniqId.generate(),
      })
    );

    return res.status(200).json({});
  } catch (err) {
    return res.status(400).json({});
  }
}
