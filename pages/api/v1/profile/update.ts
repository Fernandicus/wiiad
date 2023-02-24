import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { ErrorFindingUser } from "@/src/modules/users/user/domain/ErrorFindingUser";
import { AdvertiserProfileDataController, IUpdateProfileProps } from "@/src/common/infrastructure/controllers/AdvertiserProfileDataController";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { reqBodyParse } from "@/src/utils/helpers";
import { RoleType } from "@/src/common/domain/Role";
import { HandleUserRolesHandler } from "@/src/modules/users/user/handler/HandleUserRolesHandler";
import { HandleRoles } from "@/src/modules/users/user/use-case/HandleRoles";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";

export interface IApiReqUpdateProfile extends IUpdateProfileProps {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResp>
) {
  if (req.method !== "PUT")
    return res.status(400).json({ message: "Bad request method" });

  const reqData: IApiReqUpdateProfile = reqBodyParse(req);

  try {
    const session = userSession.getFromServer({ req, res });
    const handleUserRoles = HandleRolesHandler.givenUser(session!);
    const advertiserProfileCtrl = new AdvertiserProfileDataController();

    await MongoDB.connectAndDisconnect(async () => {
      const ctx = { req, res };

      await handleUserRoles.forRole({
        BUSINESS: async (user) => {
          await advertiserProfileCtrl.updateAdvertiserProfile({
            user: user.toPrimitives(),
            update: reqData,
            ctx,
          });
        },
        USER: async (user) => {
          throw new Error(
            `User Profile Controller for role ${user.role} do not provided`
          );
        },
        AGENCY: async (user) => {
          throw new Error(
            `Agency Profile Controller for role ${user.role} do not provided`
          );
        },
      });
    });

    return res.status(200).json({ message: `Data updated! ${reqData}` });
  } catch (err) {
    
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
