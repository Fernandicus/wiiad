import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { RoleType } from "@/src/common/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorCreatingReferral } from "@/src/modules/referrals/domain/errors/ErrorCreatingReferral";
import {
  createReferralHandler,
  findReferralHandler,
} from "@/src/modules/referrals/infrastructure/referral-container";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { ErrorFindingReferral } from "@/src/modules/referrals/domain/errors/ErrorFindingReferral";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);
  const session = userSession.getFromServer({ req, res });

  if (!session || session.role !== RoleType.USER) return res.status(400).end();

  try {
    const referralFound = await MongoDB.connectAndDisconnect(async () => {
      return await findReferralHandler.byUserId(session.id);
    });

    return res.status(200).json({ referral: referralFound });
  } catch (err) {
    
    if (err instanceof ErrorCreatingReferral)
      return res.status(401).json({ message: err.message });
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
