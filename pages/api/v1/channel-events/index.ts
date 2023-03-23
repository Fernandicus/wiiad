import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { EventQuery } from "@/src/modules/websockets/pusher/domain/QueryEventName";
import {
  TWebSocketEvent,
  WebSocketEventName,
} from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { startWatchingAdWSEventHandler } from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";
import { getVideoDurationInSeconds } from "get-video-duration";

export type IApiReqWebSocketSendEvent = { user_id: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = new EventQuery(req.query);
  const event = WebSocketEventName.validateFromString(query.event);
  const eventName = event.getName() as TWebSocketEvent;

  const session = userSession.getFromServer({ req, res });
  const id: IApiReqWebSocketSendEvent = reqBodyParse(req);
  const userId = session ? session.id : id.user_id;

  //Todo: 2. On "start-watching-ad" event start counter
  const eventTrigger: Record<TWebSocketEvent, Function> = {
    "start-watching-ad": () => startWatchingAdWSEventHandler.start(userId),
    "finish-watching-ad": () => {},
  };

  //Todo: Test what happens when the user closes session and the timer is ON,
  //todo: - in that case avoid sending payment

  eventTrigger[eventName]();

  return res.status(200);
}
