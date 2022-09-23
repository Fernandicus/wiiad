import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { CreateAd } from "@/src/ad/use-case/CreateAd";
import {
  Advertiser,
  AdvertiserPropsPrimitives,
} from "@/src/advertiser/domain/Advertiser";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { AdvertiserRol } from "@/src/advertiser/domain/value-objects/AdvertiserRol";
import { AdvertiserMongoDBRepo } from "@/src/advertiser/infraestructure/AdvertiserMongoDBRepo";
import { CreateAdvertiser } from "@/src/advertiser/use-case/CreateAdvertiser";
import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Password } from "@/src/domain/Password";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const reqBody: AdvertiserPropsPrimitives = req.body;

  try {
    const advertiserRepo = await MongoDB.advertiserRepo();//new AdvertiserMongoDBRepo();
    const createAd = new CreateAdvertiser(advertiserRepo);
    const advertiser = new Advertiser({
      email: new Email(reqBody.email),
      id: new AdvertiserId(reqBody.email),
      name: new Name(reqBody.name),
      password: new Password(reqBody.password),
      rol: new AdvertiserRol(reqBody.rol),
    });
    await createAd.create(advertiser);
    await MongoDB.disconnect();
    return res.status(200);
  } catch (err) {
    return res.status(400);
  }
}
