import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorCreatingAd } from "@/src/modules/ad/domain/ErrorCreatingAd";
import { reqBodyParse } from "@/src/utils/utils";
import formidable from "formidable";
import { userSession } from "@/src/use-case/container";
import { adCreatorHandler } from "@/src/modules/ad/ad-container";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const session = userSession.getFromServer({ req, res });

    if (!session) return res.status(400);

    const reqBody: AdPropsPrimitives = reqBodyParse(req);

    await MongoDB.connectAndDisconnect(
      async () =>
        await adCreatorHandler.create({
          adProps: reqBody,
          advertiserId: session.id,
          adId: UniqId.generate(),
        })
    );

    res.status(200).json({});
    return;
  } catch (err) {
    console.error(err);
    if (err instanceof ErrorCreatingAd) {
      console.error(" ERROR instance of ErrorCreatingAd");
      res.status(400).json({ message: err.message, info: err.info });
      return;
    }
    if (err instanceof Error) {
      console.error(" ERROR instance of Error");
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(400).json({ message: "Error creating new ad" });
    return;
  }
};
