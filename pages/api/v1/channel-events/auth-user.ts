import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IApiReqWebSocketConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { authUserSocketHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  const session = userSession.getFromServer({ req, res });
  const socketId = req.body.socket_id;
  const noauthUser: IApiReqWebSocketConnect = reqBodyParse(req);
  const userId = !session ? noauthUser.no_auth_user_id : session.id;

  const authUserResponse = authUserSocketHandler.auth({
    userId,
    socketId,
  });

  return res.send(authUserResponse);
}
