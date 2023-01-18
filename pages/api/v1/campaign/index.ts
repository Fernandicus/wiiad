import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { findCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { RoleType } from "@/src/common/domain/Role";
import { ErrorFindingCampaign } from "@/src/modules/campaign/domain/errors/ErrorFindingCampaign";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  try {
    const session = userSession.getFromServer({ req, res });

    if (!session) throw new ErrorFindingCampaign("There is no session");

    if (session?.role === RoleType.USER)
      throw new ErrorFindingCampaign("Role type has no permits");

    const campaignsFound = await MongoDB.connectAndDisconnect(
      async () => await findCampaignHandler.byAdvertiserId(session.id)
    );

    return res.status(200).json({ campaigns: campaignsFound });
  } catch (err) {
    console.error(err);
    return res.status(400);
  }
}
