import channelEvents, {
  IApiReqWebSocketSendEvent,
} from "@/pages/api/v1/channel-events/index";
import { AdTimer } from "@/src/modules/ad/domain/value-objects/AdTimer";
import { WatchAdTimeout } from "@/src/modules/websockets/pusher/domain/WatchAdTimeout";
import { WatchAdTimerList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { InsertUserWatchingAd } from "@/src/modules/websockets/pusher/use-case/InsertUserWatchingAd";
import { SendWSEvent } from "@/src/modules/websockets/pusher/use-case/SendWSEvent";
import { StartWatchingAdWSEvent } from "@/src/modules/websockets/pusher/use-case/StartWatchingAdWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { mockedWSS } from "../../../../__mocks__/context/MockedWSS";
import { futureTimeout } from "../../../../__mocks__/lib/utils/helpers";
import { mockedContext } from "../../../../__mocks__/context/MockContext";
import {
  getServerSideProps as inserWatchingAdTimeout,
  IWatchAdPage,
} from "@/pages/pusher-test/index";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { TestDBs } from "../../../../__mocks__/lib/infrastructure/db/TestDBs";
import { User } from "@/src/modules/users/user/domain/User";

describe("ON api/v1/channel-events, GIVEN a WatchingAdTimeout in a WatchingList", () => {
  let timer = new AdTimer(3);
  let userWatchingAd: UniqId;
  let startWatching: StartWatchingAdWSEvent;
  let insertWatchingAd: InsertUserWatchingAd;
  const watchList = new WatchAdTimerList();
  let users: User[];

  beforeAll(async () => {
    const dbs = await TestDBs.setAndInitAll();
    users = dbs.users;
    userWatchingAd = UniqId.new();
    const mock = mockedWSS();
    const sendEvent = new SendWSEvent(mock);
    insertWatchingAd = new InsertUserWatchingAd(watchList, sendEvent);

    startWatching = new StartWatchingAdWSEvent(watchList);
  });

  it(`WHEN send a request without a valid event name,
    THEN status code should be 400`, async () => {
    const { req, res } = mockedContext({
      query: { event: "nothing" },
    });

    await channelEvents(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a request without a valid request method,
  THEN status code should be 400`, async () => {
    const event = WebSocketEventName.event("finish-watching-ad");
    const body: IApiReqWebSocketSendEvent = {
      referrerId: UniqId.generate(),
      userId: UniqId.generate(),
    };
    const { req, res } = mockedContext({
      method: "GET",
      query: { event: event.getName() },
      body,
    });

    await channelEvents(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a request with a valid event name but without a valid body data,
  THEN status code should be 400`, async () => {
    const event = WebSocketEventName.event("finish-watching-ad");
    const { req, res } = mockedContext({
      method: "PUT",
      query: { event: event.getName() },
      body: {},
    });

    await channelEvents(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a request with valid data and req method but without starting the WatchingAdTimeout,
  THEN status code should be 400`, async () => {
    const event = WebSocketEventName.event("finish-watching-ad");
    const body: IApiReqWebSocketSendEvent = {
      referrerId: UniqId.generate(),
      userId: UniqId.generate(),
    };
    const { req, res } = mockedContext({
      method: "PUT",
      query: { event: event.getName() },
      body,
    });

    await channelEvents(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a request with valid data and req method but without starting the WatchingAdTimeout,
  THEN status code should be 400`, async () => {
    const event = WebSocketEventName.event("finish-watching-ad");
    const body: IApiReqWebSocketSendEvent = {
      referrerId: UniqId.generate(),
      userId: UniqId.generate(),
    };
    const { req, res } = mockedContext({
      method: "PUT",
      query: { event: event.getName() },
      body,
    });

    await channelEvents(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN start the WatchingAdTimeout ad and then send the events start-watching-ad, 
  and after waiting the ad to finish, send the event finish-watching-ad,
  THEN status code should be 200`, async () => {
    const resp = await visitWatchAdPage(users[0].name.name);

    const userId = users.at(-1)!.id.id;
    const referrerId = resp.userId;

    await sendStartEvent({ userId, referrerId });

    const finishResp = await sendFinishEvent({ userId, referrerId });
    expect(finishResp.statusCode).toBe(200);
  }, 25000);
});

async function visitWatchAdPage(influencerName: string): Promise<IWatchAdPage> {
  const insertAdCtx = mockedContext();
  const resp = (await inserWatchingAdTimeout({
    req: insertAdCtx.req,
    res: insertAdCtx.res,
    query: {},
    params: {},
    resolvedUrl: `/${influencerName}`,
  })) as { props: IWatchAdPage };
  return resp.props;
}

async function sendStartEvent(props: { referrerId: string; userId: string }) {
  const startEvent = WebSocketEventName.event("start-watching-ad");
  const startAdCtx = mockedContext({
    method: "PUT",
    query: { event: startEvent.getName() },
    body: {
      referrerId: props.referrerId,
      userId: props.userId,
    } as IApiReqWebSocketSendEvent,
  });
  await channelEvents(startAdCtx.req, startAdCtx.res);
}

async function sendFinishEvent(props: { referrerId: string; userId: string }) {
  const event = WebSocketEventName.event("finish-watching-ad");

  const finishAdCtx = mockedContext({
    method: "PUT",
    query: { event: event.getName() },
    body: {
      referrerId: props.referrerId,
      userId: props.userId,
    } as IApiReqWebSocketSendEvent,
  });

  await futureTimeout(async () => {
    await channelEvents(finishAdCtx.req, finishAdCtx.res);
  }, AdTimer.defaultTime().milliseconds + 1000);

  return finishAdCtx.res;
}
