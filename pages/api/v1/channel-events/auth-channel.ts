import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { authChannelSocketHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const socketId = req.body.socket_id;

  const authUserResponse = authChannelSocketHandler.watchAd({
    socketId,
  });

  return res.send(authUserResponse);
}
