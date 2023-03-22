import { authChannelWSSHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const socketId = req.body.socket_id;

  const authUserResponse = authChannelWSSHandler.watchAd({
    socketId,
    onAuth(data) {
      if (isPusherChannelAuthResponse(data)) {
        return res.send(authUserResponse);
      }
    },
  });
}

function isPusherChannelAuthResponse(
  data: unknown
): data is Pusher.ChannelAuthResponse {
  const value = Object.keys(data as object);
  return value.includes("auth");
}
