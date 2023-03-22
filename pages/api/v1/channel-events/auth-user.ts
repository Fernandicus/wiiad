import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IApiReqWSSConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { authUserWSSHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = userSession.getFromServer({ req, res });
  const socketId = req.body.socket_id;
  const noauthUser: IApiReqWSSConnect = reqBodyParse(req);
  const userId = !session ? noauthUser.no_auth_user_id : session.id;

  const authUserResponse = authUserWSSHandler.auth({
    userId,
    socketId,
  });

  return res.send(authUserResponse);
}
