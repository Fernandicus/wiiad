import { Folder } from "@/src/modules/storage/domain/Folder";
import { Name } from "@/src/common/domain/Name";
import { RoleType } from "@/src/common/domain/Role";
import {
  CloudinaryCloudStorageRepo,
  ICloudinarySignedParams,
} from "@/src/modules/storage/infrastructure/cloudinary/CloudinaryCloudStorageRepo";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { getSignedParamsHandler } from "@/src/modules/storage/infrastructure/storage-container";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";

export interface IApiRespCloudinarySignature
  extends IApiResp<ICloudinarySignedParams> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiRespCloudinarySignature>
) {
  if (req.method !== "GET") return res.status(400).json({ message: "Bad request" });

  try {
    const session = userSession.getFromServer({ req, res });

    if (!session)
      return res.status(400).end({ message: "No session provided" });
    if (session.role == RoleType.USER)
      return res.status(400).end({ message: "Action no authorized" });

    const signedParams = getSignedParamsHandler.forVideo(session.id);

    return res
      .status(200)
      .json({ message: "Cloudinary signed params", data: signedParams });
  } catch (err) {
    
    if(err instanceof Error)
    return res.status(400).json({ message: err.message });
  }
}
