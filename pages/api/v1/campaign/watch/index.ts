import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { FindAdController } from "@/src/modules/ad/controller/FindAdController";
import {
  campaignMetricsHandler,
  findCampaignHandler,
} from "@/src/modules/campaign/container";
import { reqBodyParse } from "@/src/utils/utils";
import { userSession } from "@/src/use-case/container";
import { RolType } from "@/src/domain/Rol";
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

    if (session?.rol !== RolType.USER)
      throw new ErrorFindingCampaign("Rol type has no permits");

    await MongoDB.connectAndDisconnect(async () => {
      await campaignMetricsHandler.addWatcher({
        campaignId: reqBody.campaignId,
        watcherId: session.id,
      });

      await campaignMetricsHandler.addReferral({
        campaignId: reqBody.campaignId,
        referralId: reqBody.referralId,
      });
    });

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(400);
  }
}
