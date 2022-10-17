import { AdPropsPrimitives } from "../../../../src/modules/ad/domain/Ad";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { adCreatorHandler } from "@/src/modules/ad/ad-container";
import { userSession } from "@/src/use-case/container";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    const reqBody: AdPropsPrimitives =
      typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

    const session = userSession.getFromServer({ req });

    if (!session) return res.status(400).json({ message: "No auth" });

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
