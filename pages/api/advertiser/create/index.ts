import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { AdvertiserPropsPrimitives } from "@/src/advertiser/domain/Advertiser";
import { AdvertiserCreatorHandler } from "@/src/advertiser/handler/AdvertiserCreatorHandler";
import { CreateAdvertiser } from "@/src/advertiser/use-case/CreateAdvertiser";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const reqBody: AdvertiserPropsPrimitives = req.body;

  try {
    const advertiserRepo = await MongoDB.advertiserRepo();
    const createAdvertiser = new CreateAdvertiser(advertiserRepo);

    const advertiserHandler = new AdvertiserCreatorHandler(createAdvertiser);
    await advertiserHandler.create({ ...reqBody, id: UniqId.generate() });
    
    await MongoDB.disconnect();
    return res.status(200);
  } catch (err) {
    return res.status(400);
  }
}
