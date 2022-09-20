import { AdPropsPrimitives } from "../../../src/ad/domain/Ad";
import { NextApiRequest, NextApiResponse } from "next";
import { AdCreatorController } from "@/src/ad/controller/AdCreatorController";
import { MongoDB } from "@/src/ad/infraestructure/MongoDB";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const reqBody: AdPropsPrimitives = req.body;

    const adRepository = await MongoDB.adRepository();

    const adCreatorController = new AdCreatorController(reqBody, adRepository);
    await adCreatorController.create();

    await MongoDB.disconnect();

    res.status(200);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
      return res.status(400);
    }
    res.json({ message: "Error creating new ad" });
    return res.status(400);
  }
};
