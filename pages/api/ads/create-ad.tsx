import { Ad } from "../../../lib/ad/domain/Ad";
import AdTitle from "../../../lib/ad/domain/ValueObjects/AdTitle";
import { NextApiRequest, NextApiResponse } from "next";
import AdDescription from "../../../lib/ad/domain/ValueObjects/AdDescription";
import AdImage from "../../../lib/ad/domain/ValueObjects/AdImage";
import AdRedirectionUrl from "../../../lib/ad/domain/ValueObjects/AdRedirectionUrl";
import { CreateAd } from "@/lib/ad/use-case/CreateAd";
import { AdMongoDBRepository } from "@/lib/ad/infraestructure/AdMongoDBRepository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const title = new AdTitle(req.body.title);
    const description = new AdDescription(req.body.description);
    const image = new AdImage(req.body.image);
    const redirectionUrl = new AdRedirectionUrl(req.body.redirectionUrl);

    const ad = new Ad({
      title,
      description,
      image,
      redirectionUrl,
    });

    const adRepository = await AdMongoDBRepository.connect();

    const createAd = new CreateAd(adRepository);
    await createAd.save(ad);

    await adRepository.disconnect();

    res.status(200);
    return;
  } catch (err) {
    if (!(err instanceof Error)) {
      res.json({ message: "Error creating new ad" });
      return res.status(400);
    }
    res.json({ message: err.message });
    return res.status(400);
  }
};
