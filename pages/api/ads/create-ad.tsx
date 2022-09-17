import { Ad, AdPropsPrimitives } from "../../../src/ad/domain/Ad";

import { NextApiRequest, NextApiResponse } from "next";
import { CreateAd } from "../../../src/ad/use-case/CreateAd";
import { AdMongoDBRepository } from "../../../src/ad/infraestructure/AdMongoDBRepository";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const reqBody: AdPropsPrimitives = req.body;
    const adId = AdUniqId.generate();
    const ad = Ad.createFromPrimitives({ ...reqBody, id: adId });

    const adRepository = await AdMongoDBRepository.connect();

    const createAd = new CreateAd(adRepository);

    await createAd.save(ad);

    await adRepository.disconnect();

    res.status(200);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
      return res.status(400);
    }
    res.json({ message: "Error creating new ad" });
    return res.status(400);
  }
};
