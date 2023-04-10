import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { AdvertiserProfileDataController } from "@/src/common/infrastructure/controllers/AdvertiserProfileDataController";
import { IAdvertiserDataPrimitives } from "@/src/common/domain/interfaces/IAdvertiserData";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";

export interface IApiProfileResp extends IApiResp<IAdvertiserDataPrimitives> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiProfileResp>
) {
  if (req.method !== "GET") return res.status(400);
  try {
    const session = userSession.getFromServer({ req, res });
    const advertiserProfileCtrl = new AdvertiserProfileDataController();

    const handler = HandleRolesHandler.givenUser(session!);

    const advertiserProfile = await handler.forRole({
      BUSINESS: async (user) => {
        return await MongoDB.connectAndDisconnect(
          async () => await advertiserProfileCtrl.getAdvertiserData(user.id.id)
        );
      },
      AGENCY: (_) => {
        throw new Error(
          "Could not get data for the corresponding session role"
        );
      },
      USER: (_) => {
        throw new Error(
          "Could not get data for the corresponding session role"
        );
      },
    });

    return res.status(200).json({ message: "Profile data", data: {...advertiserProfile} });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
