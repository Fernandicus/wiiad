import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { EventQuery } from "@/src/watching-ad/pusher/domain/QueryEventName";
import {
  finishWatchingAdHandler,
  startWatchingAdWSEventHandler,
} from "@/src/watching-ad/pusher/infrastructure/watching-ad-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import {
  TWatchingAdAction,
  WatchingAdActionName,
} from "@/src/watching-ad/pusher/domain/WebSocketEventName";

export type IApiReqWebSocketSendEvent = {
  refereeId: string;
  referrerId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT")
    return res.status(400).json({ message: "Bad request method" });

  const reqBody: IApiReqWebSocketSendEvent = reqBodyParse(req);
  const { referrerId, refereeId } = getUserIdAndReferrerName(
    { req, res },
    reqBody
  );

  const eventTrigger: Record<TWatchingAdAction, Function> = {
    "start-watching-ad": async () => {
      //* update this value only when the user clicks watch ad
      //* this.updateReferral.increaseReferredUsers(referrer.id);
      //* this.updateCampagin.increaseViews(campaign.id);
      await startWatchingAdWSEventHandler.start(refereeId);
    },
    "finish-watching-ad": async () => {
      await finishWatchingAdHandler.validateAndAirdrop({
        refereeId,
        referrerId,
      });
      //* => this.updateReferral.increaseWatchedAds(sessionId);
    },
  };

  try {
    const query = new EventQuery(req.query);
    const event = WatchingAdActionName.validateFromString(query.event);
    const eventName = event.getName() as TWatchingAdAction;

    await MongoDB.connectAndDisconnect(async () => {
      //Todo: Test what happens when the user closes session and the timer is ON,
      //todo: - in that case avoid sending payment
      await eventTrigger[eventName]();
    });

    return res.status(200);
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return res.status(400).json({
        message: err.message,
      });
  }
}

function getUserIdAndReferrerName(
  context: IReqAndRes,
  reqBody: IApiReqWebSocketSendEvent
): { refereeId: string; referrerId: string } {
  const session = userSession.getFromServer(context);
  const refereeId = session ? session.id : reqBody.refereeId;
  return {
    refereeId,
    referrerId: reqBody.referrerId,
  };
}
