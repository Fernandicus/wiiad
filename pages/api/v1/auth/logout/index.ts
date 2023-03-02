import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(400);

  userSession.remove({ req, res });

  return res.status(200).end();
}
