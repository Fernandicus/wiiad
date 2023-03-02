import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { reqBodyParse } from "@/src/utils/helpers";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";
import {
  IUpdateProfileProps,
  UpdateProfileDataController,
} from "@/src/common/infrastructure/controllers/UpdateProfileDataController";

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
    const updateProfileCtrl = new UpdateProfileDataController();

    await MongoDB.connectAndDisconnect(async () => {
      const ctx = { req, res };

      await handleUserRoles.forRole({
        BUSINESS: async (user) => {
          await updateProfileCtrl.updateAdvertiserProfile({
            user: user.toPrimitives(),
            updateData: reqData,
            ctx,
          });
        },
        USER: async (user) => {
          await updateProfileCtrl.updateUserProfile({
            user: user.toPrimitives(),
            updateData: reqData,
            ctx,
          });
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
