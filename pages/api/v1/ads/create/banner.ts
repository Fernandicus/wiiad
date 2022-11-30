import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { reqBodyParse } from "@/src/utils/helpers";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { adCreatorHandler } from "@/src/modules/ad/infraestructure/ad-container";

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
    res.status(400).json({ message: "Error creating new ad banner" });
    return;
  }
};
