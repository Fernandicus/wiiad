import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import {
  campaignMetricsHandler,
  findCampaignHandler,
} from "@/src/modules/campaign/container";
import { reqBodyParse } from "@/src/utils/utils";
import { userSession } from "@/src/use-case/container";
import { RoleType } from "@/src/domain/Role";
import { ErrorFindingCampaign } from "@/src/modules/campaign/domain/ErrorFindingCampaign";
import { ErrorWatchingCampaign } from "@/src/domain/ErrorWatchingCampaign";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  try {
    const reqBody: { campaignId: string } = reqBodyParse(req);

    await MongoDB.connectAndDisconnect(async () => {
      await campaignMetricsHandler.increaseViews(reqBody.campaignId);
    });

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(400);
  }
}