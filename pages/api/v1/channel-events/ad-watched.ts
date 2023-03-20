import { userSession } from "@/src/modules/session/infrastructure/session-container";
import {
  insertUserWatchingAdHandler,
  sendWebSocketEventHandler,
} from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = userSession.getFromServer({ req, res });
  const userId = session ? session.id : JSON.parse(req.body).user_id;

  console.log("object");
  
  insertUserWatchingAdHandler.insert({
    userId,
    seconds: 2, //Todo: add video/banner duration
    onTimeout: async () => {
      await sendWebSocketEventHandler.finishWatchingAd({
        userId,
        //Todo: send data when timer has concluded
        data: {
          message: "Ad watched!",
          status: 200,
        },
      });
    },
  });

  return res.status(200);
}
