import { AdPropsPrimitives } from "../../../../src/ad/domain/Ad";
import { NextApiRequest, NextApiResponse } from "next";
import { AdCreatorHandler } from "@/src/ad/handler/AdCreatorHandler";
import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { CreateAd } from "@/src/ad/use-case/CreateAd";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const reqBody: AdPropsPrimitives = req.body;

    const adRepository = await MongoDB.adRepository();
    const createAd = new CreateAd(adRepository);

    const adCreatorHandler = new AdCreatorHandler(createAd);
    await adCreatorHandler.create(reqBody);

    await MongoDB.disconnect();

    res.status(200);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(400).json({ message: "Error creating new ad" });
    return;
  }
};
