import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { EventQuery } from "@/src/modules/websockets/pusher/domain/QueryEventName";
import {
  TWebSocketEvent,
  WebSocketEventName,
} from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { TriggerEvent } from "@/src/modules/websockets/pusher/use-case/TriggerEvent";
import { reqBodyParse } from "@/src/utils/helpers";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

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

  const triggerEvent = new TriggerEvent();
  const eventTrigger: Record<TWebSocketEvent, Function> = {
    "start-watching-ad": triggerEvent.startWatchingAd,
    "finish-watching-ad": () =>
      triggerEvent.finishWatchingAd(new UniqId(userId)),
  };

  eventTrigger[eventName]();

  return res.status(200);
}
