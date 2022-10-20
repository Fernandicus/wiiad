import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { CreateAdController } from "@/src/modules/ad/controller/CreateAdController";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const reqBody: AdPropsPrimitives =
      typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

    await MongoDB.connectAndDisconnect(
      async () =>
        await CreateAdController.create({
          context: { req, res },
          adProps: reqBody,
          adId: UniqId.generate(),
        })
    );

    res.status(200).json({});
    return;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(400).json({ message: "Error creating new ad" });
    return;
  }
};
