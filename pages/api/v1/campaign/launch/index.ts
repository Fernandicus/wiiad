import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { LaunchCampaignController } from "@/src/modules/campaign/infrastructure/controllers/LaunchCampaignController";
import { CampaignBudgetProps, ICampaignBudgetPrimitives } from "@/src/modules/campaign/domain/value-objects/Budget";
import { ErrorCreatingCampaign } from "@/src/modules/campaign/domain/value-objects/ErrorCreatingCampaign";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { UniqId } from "@/src/utils/UniqId";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).json({});

  try {
    const session = userSession.getFromServer({ req, res });
    if (!session) res.status(400).end();
    
    const ad: { id: string; budget: ICampaignBudgetPrimitives } = reqBodyParse(req);

    await MongoDB.connectAndDisconnect(
      async () =>
        await LaunchCampaignController.launch({
          adId: ad.id,
          id: UniqId.generate(),
          budget: ad.budget,
          advertiserId: session!.id,
        })
    );

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
}
