import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IApiReqWSSConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { disconnectWSSHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: IApiReqWSSConnect = reqBodyParse(req);
  const session = userSession.getFromServer({ req, res });

  const userId = !session ? id.no_auth_user_id : session.id;
  disconnectWSSHandler.disconnect(userId);

  return res.status(200);
}
