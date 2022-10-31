import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { FindAdController } from "@/src/modules/ad/controller/FindAdController";
import { findCampaignHandler } from "@/src/modules/campaign/container";
import { reqBodyParse } from "@/src/utils/utils";
import { userSession } from "@/src/use-case/container";
import { RolType } from "@/src/domain/Rol";
import { ErrorFindingCampaign } from "@/src/modules/campaign/domain/ErrorFindingCampaign";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  try {
    const reqBody: { referralId: string; campaignId: string } =
      reqBodyParse(req);

    const session = userSession.getFromServer({ req, res });

    if (!session) throw new ErrorFindingCampaign("There is no session");

    if (session?.rol === RolType.USER)
      throw new ErrorFindingCampaign("Rol type has no permits");

    const campaignFound = await MongoDB.connectAndDisconnect(
      async () => await findCampaignHandler.byId(session.id)
    );

    return res.status(200).json({ campaigns: campaignFound });
  } catch (err) {
    return res.status(400);
  }
}
