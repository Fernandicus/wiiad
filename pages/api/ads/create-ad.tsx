import { Ad } from "../../../lib/ad/domain/Ad";
import AdTitle from "../../../lib/ad/domain/ValueObjects/AdTitle";
import { NextApiRequest, NextApiResponse } from "next";
import AdDescription from "../../../lib/ad/domain/ValueObjects/AdDescription";
import AdImage from "../../../lib/ad/domain/ValueObjects/AdImage";
import AdRedirectionUrl from "../../../lib/ad/domain/ValueObjects/AdRedirectionUrl";
import { CreateAd } from "@/lib/ad/use-case/CreateAd";
import { AdMongoDBRepository } from "@/lib/ad/interface/AdMongoDBRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);
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

    await adRepository.disconnect()

    return res.status(200);
    
  } catch (err) {
    if (!(err instanceof Error))
      return res.status(400).json({ message: "Error creating new ad" });
    return res.status(400).json({ message: err.message });
  }
}
