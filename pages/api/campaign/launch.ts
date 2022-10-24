import { MongoDB } from "@/src/infrastructure/MongoDB";
import { LaunchCampaignController } from "@/src/modules/campaign/controller/LaunchCampaignController";
import { CampaignBudgetProps } from "@/src/modules/campaign/domain/value-objects/Budget";
import { ErrorCreatingCampaign } from "@/src/modules/campaign/domain/value-objects/ErrorCreatingCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).json({});

  try {
    const ad: { id: string; budget: CampaignBudgetProps } =
      typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

    await MongoDB.connectAndDisconnect(async () =>
      await LaunchCampaignController.launch({
        context: { req, res },
        adId: ad.id,
        id: UniqId.generate(),
        budget: ad.budget,
      })
    );

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
}
