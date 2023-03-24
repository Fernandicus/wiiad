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
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";

export type IApiReqWebSocketSendEvent = {
  userId: string;
  referrerId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT")
    return res.status(400).json({ message: "Bad request method" });

  const reqBody: IApiReqWebSocketSendEvent = reqBodyParse(req);
  const { referrerId, userId } = getUserIdAndReferrerName(
    { req, res },
    reqBody
  );

  const eventTrigger: Record<TWebSocketEvent, Function> = {
    "start-watching-ad": () => {
      //* this.updateReferral.increaseReferredUsers(referrer.id);
      //* update this value only when the user clicks watch ad
      //* this.updateCampagin.increaseViews(randomCampaign.id);
      //* => this.updateReferral.increaseWatchedAds(sessionId);
      startWatchingAdWSEventHandler.start(userId);
    },
    "finish-watching-ad": async () => {
      await MongoDB.connectAndDisconnect(async () => {
        await finishWatchingAdHandler.validateAndAirdrop({
          refereeId: userId,
          referrerId,
        });
      });
    },
  };

  try {
    const query = new EventQuery(req.query);
    const event = WebSocketEventName.validateFromString(query.event);
    const eventName = event.getName() as TWebSocketEvent;

    //Todo: Test what happens when the user closes session and the timer is ON,
    //todo: - in that case avoid sending payment
    await eventTrigger[eventName]();

    return res.status(200);
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({
        message: err.message,
      });
  }
}

function getUserIdAndReferrerName(
  context: IReqAndRes,
  reqBody: IApiReqWebSocketSendEvent
): { userId: string; referrerId: string } {
  const session = userSession.getFromServer(context);
  const userId = session ? session.id : reqBody.userId;
  return {
    userId,
    referrerId: reqBody.referrerId,
  };
}
