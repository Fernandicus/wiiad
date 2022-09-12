import { Advertise } from "../../../lib/advertise/domain/Advertise";
import AdTitle from "../../../lib/advertise/domain/AdTitle";
import { NextApiRequest, NextApiResponse } from "next";
import ReviewParams from "../../../lib/advertise/use-case/ReviewParams";
import AdDescription from "../../../lib/advertise/domain/AdDescription";
import AdImage from "../../../lib/advertise/domain/AdImage";
import AdRedirectionUrl from "../../../lib/advertise/domain/AdRedirectionUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  try {
    const {
      title,
      description,
      image,
      redirectionUrl,
    }: {
      title: AdTitle;
      description: AdDescription;
      image: AdImage;
      redirectionUrl: AdRedirectionUrl;
    } = ReviewParams.forCreateAd({ reqBody: req.body });

    const advertise: Advertise = Advertise.new(
      title,
      description,
      image,
      redirectionUrl
    );

    return res.status(200);
  } catch (err) {
    if (!(err instanceof Error))
      return res.status(400).json({ message: "Error creating new advertirse" });
    return res.status(400).json({ message: err.message });
  }
}
