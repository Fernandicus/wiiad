import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { CreateAdController } from "@/src/modules/ad/controller/CreateAdController";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorCreatingAd } from "@/src/modules/ad/domain/ErrorCreatingAd";
import { reqBodyParse } from "@/src/utils/utils";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = new formidable.IncomingForm();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {

    form.parse(req, async (err, fields, files) => {

      const reqBody: AdPropsPrimitives = {
        id: "",
        advertiserId: "",
        title: fields["title"] as string,
        description: fields["description"] as string,
        file: fields["image"] as string,
        redirectionUrl: fields["redirectionUrl"] as string,
        segments: fields["segments"] as string[],
      };

      console.log(reqBody.title);

      await MongoDB.connectAndDisconnect(
        async () =>
          await CreateAdController.videoAd({
            context: { req, res },
            adProps: reqBody,
            adId: UniqId.generate(),
          })
      );

      res.status(200).json({});
      return;
    });
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
