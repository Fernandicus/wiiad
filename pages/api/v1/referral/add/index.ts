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
import { CreateReferral } from "@/src/modules/referrals/use-case/CreateReferral";
import { ReferralMongoDBRepo } from "@/src/modules/referrals/infrastructure/ReferralMongoDBRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorCreatingReferral } from "@/src/modules/referrals/domain/ErrorCreatingReferral";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { Balance } from "@/src/domain/Balance";
import {
  createReferralHandler,
  findReferralHandler,
  updateReferralHandler,
} from "@/src/modules/referrals/referral-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

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

    if (session?.rol !== RolType.USER)
      throw new ErrorCreatingReferral("Rol type has no permits");

    if (session.rol === reqBody.referrerId)
      throw new ErrorCreatingReferral("Cant referee to yourself");

    const increasedBalance = await MongoDB.connectAndDisconnect(async () => {
      const referrer_referralFound = await findReferralHandler.byUserId(
        reqBody.referrerId
      );

      const referee_referralFound = await findReferralHandler.byUserId(
        session.id
      );

      const campaignBalance = reqBody.campaign.budget.balance;
      const clicks = reqBody.campaign.budget.clicks;
      const balanceToAdd = Math.floor(campaignBalance / clicks);

      if (!referrer_referralFound) {
        await createReferralHandler.forReferrer({
          id: UniqId.generate(),
          referrerId: reqBody.referrerId,
          referrerBalance: balanceToAdd,
        });
      } else {
        await updateReferralHandler.increaseReferrerBalance(
          reqBody.referrerId,
          balanceToAdd
        );
      }

      if (!referee_referralFound) {
        await createReferralHandler.forReferee({
          id: UniqId.generate(),
          refereeId: session.id,
          refereeBalance: balanceToAdd,
        });
      } else {
        await updateReferralHandler.increaseRefereeBalance(
          session.id,
          balanceToAdd
        );
      }

      return balanceToAdd;
    });

    return res.status(200).json({ increasedBalance });
  } catch (err) {
    if(err instanceof ErrorCreatingReferral)
      return res.status(401).json({ message: err.info});
    if(err instanceof Error)
      return res.status(400).json({ message: err.message});
  }
}