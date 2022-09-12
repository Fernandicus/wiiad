import { Advertise } from "../../../lib/advertise/domain/Advertise";
import AdTitle from "../../../lib/advertise/domain/AdTitle";
import { NextApiRequest, NextApiResponse } from "next";
import AdDescription from "../../../lib/advertise/domain/AdDescription";
import AdImage from "../../../lib/advertise/domain/AdImage";
import AdRedirectionUrl from "../../../lib/advertise/domain/AdRedirectionUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  try {
    const adTitle: AdTitle = new AdTitle(req.body.title);
    const adDescription: AdDescription = new AdDescription(
      req.body.description
    );
    const adImage: AdImage = new AdImage(req.body.image);
    const adRedirectionUrl: AdRedirectionUrl = new AdRedirectionUrl(
      req.body.redirectionUrl
    );

    const advertise: Advertise = Advertise.new(
      adTitle,
      adDescription,
      adImage,
      adRedirectionUrl
    );

    return res.status(200);
  } catch (err) {
    if (!(err instanceof Error))
      return res.status(400).json({ message: "Error creating new advertirse" });
    return res.status(400).json({ message: err.message });
  }
}
