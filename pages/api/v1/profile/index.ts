import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { RoleType } from "@/src/common/domain/Role";
import { ErrorFindingUser } from "@/src/modules/users/user/domain/ErrorFindingUser";
import {
  ProfileDataController,
} from "@/src/common/infrastructure/controllers/ProfileDataController";
import { IAdvertiserDataPrimitives } from "@/src/common/domain/interfaces/IAdvertiserData";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";



export interface IApiProfileResp extends IApiResp<IAdvertiserDataPrimitives> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  try {
    const session = userSession.getFromServer({ req, res });
    if (!session) throw new ErrorFindingUser("There is no session");
    if (session.role === RoleType.USER) return res.status(400);

    const profileController = new ProfileDataController();
    const data = await MongoDB.connectAndDisconnect(
      async () => await profileController.getAdvertiserData(session.id)
    );
    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    return res.status(400);
  }
}
