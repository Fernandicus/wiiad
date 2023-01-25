import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { RemoveAdController } from "@/src/modules/ad/infraestructure/controllers/RemoveAdController";
import { ErrorRemovingAd } from "@/src/modules/ad/domain/errors/ErrorRemovingAd";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<IApiResp>
) {
  if (req.method !== "DELETE") return res.status(400);

  try {
    const adId: string =
      typeof req.body !== "object" ? JSON.parse(req.body).adId : req.body.adId;
    if (!adId) throw new ErrorRemovingAd("Ad id is mandatory");

    await MongoDB.connectAndDisconnect(
      async () => await RemoveAdController.remove({ req, res }, adId)
    );

    res.status(200).json({ message: `Ad ${adId} removed` });
    return;
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
    return;
  }
}
