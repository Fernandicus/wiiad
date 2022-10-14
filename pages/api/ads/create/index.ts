import { AdPropsPrimitives } from "../../../../src/modules/ad/domain/Ad";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { adCreatorHandler } from "@/src/modules/ad/ad-container";
import { AdModel } from "@/src/modules/ad/infraestructure/AdModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const reqBody: AdPropsPrimitives = typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

    await MongoDB.connect();
    
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
