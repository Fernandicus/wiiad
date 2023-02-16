import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { ErrorFindingUser } from "@/src/modules/users/user/domain/ErrorFindingUser";
import { ProfileDataController } from "@/src/common/infrastructure/controllers/ProfileDataController";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { reqBodyParse } from "@/src/utils/helpers";
import { IUpdateDataPrimitives } from "@/src/modules/users/user/handler/UpdateUserHandler";

export interface IApiReqUpdateProfile extends IUpdateDataPrimitives {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResp>
) {
  if (req.method !== "PUT")
    return res.status(400).json({ message: "Bad request method" });

  const reqData: IApiReqUpdateProfile = reqBodyParse(req);

  try {
    const session = userSession.getFromServer({ req, res });
    if (!session) throw new ErrorFindingUser("There is no session");

    const profileController = new ProfileDataController();
    await MongoDB.connectAndDisconnect(async () => {
      const ctx = { req, res };
      await profileController.updateProfile({ session, update: reqData, ctx });
    });

    return res.status(200).json({ message: `Data updated! ${reqData}` });
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
