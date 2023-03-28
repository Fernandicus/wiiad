import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IApiReqWSSConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { authUserWSSHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { UniqId } from "@/src/common/domain/UniqId";
import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = userSession.getFromServer({ req, res });
  const socketId = req.body.socket_id;
  const noauthUser: IApiReqWSSConnect = reqBodyParse(req);
  const userId = !session ? noauthUser.no_auth_user_id : session.id;

  authUserWSSHandler.auth({
    userId,
    socketId,
    onAuth(data) {
      if (isPusherUserAuthResponse(data)) {
        return res.send(data);
      }
    },
  });
}

function isPusherUserAuthResponse(
  data: unknown
): data is Pusher.UserAuthResponse {
  const value = Object.keys(data as object);
  return value.includes("auth") && value.includes("user_data");
}
