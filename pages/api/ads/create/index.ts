import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { CreateAdController } from "@/src/modules/ad/controller/CreateAdController";

export interface ICreateAdBodyReq {
  title: string;
  description: string;
  image: string;
  redirectionUrl: string;
  segments: string[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const reqBody: ICreateAdBodyReq =
      typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

    await MongoDB.connectAndDisconnect(
      async () => await CreateAdController.create({ req, res }, reqBody)
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
