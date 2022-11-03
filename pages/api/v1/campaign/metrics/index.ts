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
    const reqBody: { referralId: string; campaignId: string } =
      reqBodyParse(req);

    const session = userSession.getFromServer({ req, res });

    if (!session) throw new ErrorFindingCampaign("There is no session");

    if (session?.role !== RoleType.USER)
      throw new ErrorFindingCampaign("Role type has no permits");

    await MongoDB.connectAndDisconnect(async () => {
      await campaignMetricsHandler.increaseViews(reqBody.campaignId);
    });

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(400);
  }
}
