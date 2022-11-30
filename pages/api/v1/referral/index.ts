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

  try {
    const session = userSession.getFromServer({ req, res });

    if (!session) throw new ErrorCreatingReferral("There is no session");

    if (session?.role !== RoleType.USER)
      throw new ErrorCreatingReferral("Rol type has no permits");

    const referralFound = await MongoDB.connectAndDisconnect(async () => {
      try {
        const referralFound = await findReferralHandler.byUserId(session.id);
        return referralFound;
      } catch (err) {
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
    });

    return res.status(200).json({ referral: referralFound });
  } catch (err) {
    console.error(err);
    if (err instanceof ErrorCreatingReferral)
      return res.status(401).json({ message: err.message });
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
