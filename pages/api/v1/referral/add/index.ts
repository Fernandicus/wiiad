import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";

import { reqBodyParse } from "@/src/utils/helpers";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { RoleType } from "@/src/common/domain/Role";
import { ErrorCreatingReferral } from "@/src/modules/referrals/domain/errors/ErrorCreatingReferral";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

//!     *** ESTA CONEXIÓN API ES TEMPORAL Y NO ES VÁLIDA
//TODO:     ** ESTA LOGICA DEBE IR EN EL WEBSOCKET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  try {
    const reqBody: { referrerId: string; campaign: ICampaignPrimitives } =
      reqBodyParse(req);

    const session = userSession.getFromServer({ req, res });

    if (!session) throw new ErrorCreatingReferral("There is no session");

    if (session?.role !== RoleType.USER)
      throw new ErrorCreatingReferral("Rol type has no permits");

    if (session.id === reqBody.referrerId)
      throw new ErrorCreatingReferral("Cant referee to yourself");

    const increasedBalance = await MongoDB.connectAndDisconnect(async () => {
      const campaignBalance = reqBody.campaign.budget.balance;
      const clicks = reqBody.campaign.budget.clicks;
      const balanceToAdd = Math.floor(campaignBalance / clicks);
      //const referralController = new ReferralController();
     /*  await increaseReferralBalance.increase({
        balance: balanceToAdd,
        refereeId: session.id,
        referrerId: reqBody.referrerId,
      }); */

      return balanceToAdd;
    });

    return res.status(200).json({ increasedBalance });
  } catch (err) {
    if (err instanceof ErrorCreatingReferral)
      return res.status(401).json({ message: err.message });
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
