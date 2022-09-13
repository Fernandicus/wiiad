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
    const title = new AdTitle(req.body.title);
    const description = new AdDescription(req.body.description);
    const image = new AdImage(req.body.image);
    const redirectionUrl = new AdRedirectionUrl(
      req.body.redirectionUrl
    );

    const advertise = new Advertise({
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
