import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { RoleType } from "@/src/common/domain/Role";
import { ErrorCreatingReferral } from "@/src/modules/referrals/domain/errors/ErrorCreatingReferral";
import { findReferralHandler } from "@/src/modules/referrals/infrastructure/referral-container";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";
import { ErrorFindingReferral } from "@/src/modules/referrals/domain/errors/ErrorFindingReferral";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";

export interface IApiRespReferralGetData
  extends IApiResp<IReferralPrimitives> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiRespReferralGetData>
) {
  if (req.method !== "GET") return res.status(400);
  const session = userSession.getFromServer({ req, res });

  try {
    const roleHandler = HandleRolesHandler.givenUser(session!);
    const referralData = await roleHandler.isRole("AGENCY", {
      then(_) {
        throw Error("Agency role has no permits");
      },
      else: async (user) => {
        return await MongoDB.connectAndDisconnect(async () => {
          const referralFound = await findReferralHandler.byUserId(user.id.id);
          return referralFound.match({
            some: (referral) => referral,
            nothing() {
              throw ErrorFindingReferral.byUserId(user.id.id);
            },
          });
        });
      },
    });

    return res
      .status(200)
      .json({ message: "Referral data found", data: referralData });
  } catch (err) {
    if (err instanceof ErrorCreatingReferral)
      return res.status(401).json({ message: err.message });
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
