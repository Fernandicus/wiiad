import { Ad, AdPropsPrimitives } from "../../../src/ad/domain/Ad";
import { AdTitle } from "../../../src/ad/domain/ValueObjects/AdTitle";
import { NextApiRequest, NextApiResponse } from "next";
import { AdDescription } from "../../../src/ad/domain/ValueObjects/AdDescription";
import { AdImage } from "../../../src/ad/domain/ValueObjects/AdImage";
import { AdRedirectionUrl } from "../../../src/ad/domain/ValueObjects/AdRedirectionUrl";
import { CreateAd } from "../../../src/ad/use-case/CreateAd";
import { AdMongoDBRepository } from "../../../src/ad/infraestructure/AdMongoDBRepository";
import { AdvertiserId } from "../../../src/ad/domain/ValueObjects/AdvertiserId";
import { AdSegments } from "@/src/ad/domain/ValueObjects/AdSegments";
import { GetAdValueObjects } from "@/src/ad/domain/services/GetAdValueObjects";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const reqBody: AdPropsPrimitives = req.body;

    const ad = Ad.createFromPrimitives({ ...reqBody });

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
