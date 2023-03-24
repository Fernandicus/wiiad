import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { EventQuery } from "@/src/modules/websockets/pusher/domain/QueryEventName";
import {
  TWebSocketEvent,
  WebSocketEventName,
} from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import {
  finishWatchingAdHandler,
  startWatchingAdWSEventHandler,
} from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";

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

  const eventTrigger: Record<TWebSocketEvent, Function> = {
    "start-watching-ad": () => startWatchingAdWSEventHandler.start(userId),
    "finish-watching-ad": async () => {
      try {
        await MongoDB.connectAndDisconnect(async () => {
          await finishWatchingAdHandler.validateAndAirdrop({
            refereeId: userId,
            referrerId: UniqId.generate(), //Todo: Add a real referrer id
          });
        });
      } catch (err) {
        return res
          .status(500)
          .json({
            message: "Something went wrong validating the finish watching ad",
          });
      }
    },
  };

  //Todo: Test what happens when the user closes session and the timer is ON,
  //todo: - in that case avoid sending payment

  eventTrigger[eventName]();

  return res.status(200);
}
