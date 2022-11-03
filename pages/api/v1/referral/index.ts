import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";

import { reqBodyParse } from "@/src/utils/utils";
import { userSession } from "@/src/use-case/container";
import { RoleType } from "@/src/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorCreatingReferral } from "@/src/modules/referrals/domain/ErrorCreatingReferral";

import {
  createReferralHandler,
  findReferralHandler,
  updateReferralHandler,
} from "@/src/modules/referrals/referral-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { ReferralController } from "@/src/modules/referrals/controllers/ReferralController";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { ErrorFindingReferral } from "@/src/modules/referrals/domain/ErrorFindingReferral";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  try {
    const session = userSession.getFromServer({ req, res });

    if (!session) throw new ErrorCreatingReferral("There is no session");

    if (session?.role !== RoleType.USER)
      throw new ErrorCreatingReferral("Rol type has no permits");

    const referralFound = await MongoDB.connectAndDisconnect(async () => {
      const referralFound = await findReferralHandler.byUserId(session.id);

      if (!referralFound) {
        const newReferral = Referral.empty({
          id: UniqId.new(),
          userId: new UniqId(session.id),
        }).toPrimitives();

        await createReferralHandler.create({
          id: UniqId.generate(),
          userId: UniqId.generate(),
          referral: newReferral,
        });
        return newReferral;
      }

      return referralFound;
    });

    return res.status(200).json({ referral: referralFound });
  } catch (err) {
    if (err instanceof ErrorCreatingReferral)
      return res.status(401).json({ message: err.info });
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
