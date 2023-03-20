import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { authUserSocketHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = userSession.getFromServer({ req, res });
  const socketId = req.body.socket_id;
  const userId = !session ? req.body.user_id : session.id;

  const authUserResponse = authUserSocketHandler.auth({
    userId,
    socketId,
  });

  return res.send(authUserResponse);
}
