import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import {
  campaignMetricsHandler,
  findCampaignHandler,
} from "@/src/modules/campaign/infrastructure/campaign-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { RoleType } from "@/src/domain/Role";
import { ErrorFindingCampaign } from "@/src/modules/campaign/domain/errors/ErrorFindingCampaign";
import { ErrorWatchingCampaign } from "@/src/domain/ErrorWatchingCampaign";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  try {
    const reqBody: { campaignId: string } = reqBodyParse(req);
console.log("INCREASE CLICKS :");
    await MongoDB.connectAndDisconnect(async () => {
      await campaignMetricsHandler.increaseClicks(reqBody.campaignId);
    });

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(400);
  }
}
