import { Folder } from "@/src/modules/storage/domain/Folder";
import { Name } from "@/src/common/domain/Name";
import { RoleType } from "@/src/common/domain/Role";
import { CloudinaryCloudStorageRepo } from "@/src/modules/storage/infrastructure/cloudinary/CloudinaryCloudStorageRepo";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { getSignedParamsHandler } from "@/src/modules/storage/infrastructure/storage-container";
import { IApiRespCloudinarySignature } from "./video-sign-request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiRespCloudinarySignature>
) {
  if (req.method !== "GET")
    return res.status(400).json({ message: "Bad request" });

  try {
    const session = userSession.getFromServer({ req, res });

    if (!session)
      return res.status(400).end({ message: "No session provided" });
    if (session.role == RoleType.USER)
      return res.status(400).end({ message: "Action no authorized" });

    let signedParams;

    if (session.role !== RoleType.USER) {
      signedParams = getSignedParamsHandler.forAdvertiserProfilePic(
        session.id
      );
    }

    return res
      .status(200)
      .json({ message: "Cloudinary signed params", data: signedParams });
  } catch (err) {
    
    return res.status(400).json({ message: "Something went wrong" });
  }
}
