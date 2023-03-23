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

  //Todo: 1. catch ad id from req and get the ad Url from DB
  const adDuration = await getVideoDurationInSeconds(
    "https://res.cloudinary.com/fernanprojects/video/upload/f_mp4/q_auto/du_30/c_scale,h_405,w_750/fps_30/v1/advertisers/777b5fec-dee5-4bde-a0c3-c32a36aa0184/ads/videos/f0pgpzw3epvfw0h28fuc.mp4"
  );
  const campaignId = UniqId.generate();

  //Todo: 1. On start-watching-ad event send ad data and start timer acording to the ad duration
  //Todo: 2. On finish-watching-ad send event and if user is still connected add referrer data
  const eventTrigger: Record<TWebSocketEvent, Function> = {
    "start-watching-ad": () =>
      startWatchingAdWSEventHandler.start({
        userId,
        campaignId,
        timer: adDuration,
        eventData: {
          message: "Ad timer finished",
          data: { status: 200 },
        },
      }),
    "finish-watching-ad": () => {},
    "ad-info": () => {},
  };

  //Todo: Test what happens when the user closes session and the timer is ON,
  //todo: - in that case avoid sending payment

  eventTrigger[eventName]();

  return res.status(200);
}
