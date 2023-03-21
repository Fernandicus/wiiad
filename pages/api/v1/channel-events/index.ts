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

  //Todo: 1. On start-watching-ad event send ad data and start timer acording to the ad duration
  //Todo: 2. On finish-watching-ad send event and if user is still connected add referrer data
  const eventTrigger: Record<TWebSocketEvent, Function> = {
    "start-watching-ad": triggerEvent.startWatchingAd,
    "finish-watching-ad": () =>
      triggerEvent.finishWatchingAd(new UniqId(userId)),
  };

  //Todo: Test what happens when the user closes session and the timer is ON,
  //todo: - in that case avoid sending payment

  eventTrigger[eventName]();

  return res.status(200);
}
