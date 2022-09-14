import { Ad } from "../../../lib/ad/domain/Ad";
import AdTitle from "../../../lib/ad/domain/ValueObjects/AdTitle";
import { NextApiRequest, NextApiResponse } from "next";
import AdDescription from "../../../lib/ad/domain/ValueObjects/AdDescription";
import AdImage from "../../../lib/ad/domain/ValueObjects/AdImage";
import AdRedirectionUrl from "../../../lib/ad/domain/ValueObjects/AdRedirectionUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  try {
    const title = new AdTitle(req.body.title);
    const description = new AdDescription(req.body.description);
    const image = new AdImage(req.body.image);
    const redirectionUrl = new AdRedirectionUrl(
      req.body.redirectionUrl
    );

    const advertise = new Ad({
      title,
      description,
      image,
      redirectionUrl,
    });

    //!TODO:: TDD =>  USE CASE 'CreateNewAd'

    return res.status(200);
  } catch (err) {
    if (!(err instanceof Error))
      return res.status(400).json({ message: "Error creating new advertirse" });
    return res.status(400).json({ message: err.message });
  }
}
