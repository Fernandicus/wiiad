import { MongoDB } from "@/src/infrastructure/MongoDB";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { AdvertiserCreatorHandler } from "@/src/modules/advertiser/handler/AdvertiserCreatorHandler";
import { CreateAdvertiser } from "@/src/modules/advertiser/use-case/CreateAdvertiser";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";
import { RolType } from "@/src/domain/Rol";
import { createAdvertiserHandler } from "@/src/modules/advertiser/advertiser-container";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const reqBody: AdvertiserPropsPrimitives = typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

  if (reqBody.rol === RolType.USER || !reqBody.rol) {
    return res.status(400).json({
      message: `Cant create an advertiser with this rol ${reqBody.rol}`,
    });
  }

  try {
    await MongoDB.connect();
    
    const uniqId = UniqId.generate();
    await createAdvertiserHandler.create({ ...reqBody, id: uniqId });

    await MongoDB.disconnect();
    return res.status(200).json({ id: uniqId });
  } catch (err) {
    return res.status(400);
  }
}
