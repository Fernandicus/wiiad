import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { disconnectWebSocketHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Todo: Test when the user sends an event and check if the video has ended

  const session = userSession.getFromServer({ req, res });

  console.log("Closing connection");
  disconnectWebSocketHandler.disconnect(session!.id);

  return res.status(200);
}
