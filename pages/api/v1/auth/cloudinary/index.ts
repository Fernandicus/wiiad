import { Folder } from "@/src/modules/storage/domain/Folder";
import { Name } from "@/src/domain/Name";
import { RoleType } from "@/src/domain/Role";
import { CloudinaryCloudStorageRepo } from "@/src/modules/storage/infrastructure/CloudinaryCloudStorageRepo";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400).end();

  const session = userSession.getFromServer({ req, res });
  if (!session) return res.status(400).end({ message: "No session provided" });

  try {
    const session = userSession.getFromServer({ req, res });

    if (!session)
      return res.status(400).end({ message: "No session provided" });
    if (session.role == RoleType.USER)
      return res.status(400).end({ message: "Action no authorized" });

    const userName = session.name;
    const cloudinary = new CloudinaryCloudStorageRepo();
    const folder = Folder.videoAd(new Name(userName));
    const signedParams = cloudinary.getSignedData(folder);

    return res.status(200).json(signedParams);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
