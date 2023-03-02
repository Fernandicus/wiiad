import { Folder } from "@/src/modules/storage/domain/Folder";
import { Name } from "@/src/common/domain/Name";
import { RoleType } from "@/src/common/domain/Role";
import { CloudinaryCloudStorageRepo } from "@/src/modules/storage/infrastructure/cloudinary/CloudinaryCloudStorageRepo";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { getSignedParamsHandler } from "@/src/modules/storage/infrastructure/storage-container";
import { IApiRespCloudinarySignature } from "./video-sign-request";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiRespCloudinarySignature>
) {
  if (req.method !== "GET")
    return res.status(400).json({ message: "Bad request" });

  try {
    const session = userSession.getFromServer({ req, res });

    const roleHandler = HandleRolesHandler.givenUser(session!);

    const signedParams = roleHandler.forRole({
      AGENCY: (_) => {
        throw new Error("Could not sign profile pic for the given role");
      },
      BUSINESS: (user) => {
        return getSignedParamsHandler.forAdvertiserProfilePic(user.id.id);
      },
      USER: (user) => {
        return getSignedParamsHandler.forUserProfilePic(user.id.id);
      },
    });

    return res
      .status(200)
      .json({ message: "Cloudinary signed params", data: signedParams });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
