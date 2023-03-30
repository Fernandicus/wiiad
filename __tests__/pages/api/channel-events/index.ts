import channelEvents, {
  IApiReqWatchingAdAction,
} from "@/pages/api/v1/watch-ad/index";
import { AdDuration } from "@/src/modules/ad/domain/value-objects/AdDuration";
import { WatchAdTimeout } from "@/src/modules/websockets/pusher/domain/WatchAdTimeout";
import { WatchAdDurationList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
import { WebSocketEventName } from "@/src/watching-ad/domain/WatchingAdActionName";
import { InsertUserWatchingAd } from "@/src/watching-ad/pusher/use-case/InsertUserWatchingAd";
import { SendWSEvent } from "@/src/watching-ad/pusher/use-case/SendWSEvent";
import { InitWatchingAdTimer } from "@/src/watching-ad/pusher/use-case/InitWatchingAdTimer";
import { UniqId } from "@/src/common/domain/UniqId";
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
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";

describe("ON api/v1/channel-events, GIVEN a WatchingAdTimeout in a WatchingList", () => {
  let timer = new AdDuration(3);
  let userWatchingAd: UniqId;
  let startWatching: InitWatchingAdTimer;
  let insertWatchingAd: InsertUserWatchingAd;
  const watchList = new WatchAdDurationList();
  let users: User[];

  beforeAll(async () => {
    const dbs = await TestDBs.setAndInitAll();
    users = dbs.users;
    userWatchingAd = UniqId.new();
    const mock = mockedWSS();
    const sendEvent = new SendWSEvent(mock);
    insertWatchingAd = new InsertUserWatchingAd(watchList, sendEvent);

    startWatching = new InitWatchingAdTimer(watchList);
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
    const referrerId = ReferrerId.new();
    const refereeId = RefereeId.new();
    const body: IApiReqWatchingAdAction = {
      referrerId: referrerId.value(),
      refereeId: refereeId.value(),
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
    const referrerId = ReferrerId.new();
    const refereeId = RefereeId.new();
    const body: IApiReqWatchingAdAction = {
      referrerId: referrerId.value(),
      refereeId: refereeId.value(),
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
    const referrerId = ReferrerId.new();
    const refereeId = RefereeId.new();
    const body: IApiReqWatchingAdAction = {
      referrerId: referrerId.value(),
      refereeId: refereeId.value(),
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

    const userId = users.at(-1)!.id;
    const refereeId = new RefereeId({ uniqId: userId });
    const referrerId = new RefereeId({
      uniqId: new UniqId(resp.referrerProfile.id),
    });

    const body = {
      refereeId: refereeId.value(),
      referrerId: referrerId.value(),
    };

    await sendStartEvent(body);

    const finishResp = await sendFinishEvent(body);
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

async function sendStartEvent(props: {
  referrerId: string;
  refereeId: string;
}) {
  const startEvent = WebSocketEventName.event("start-watching-ad");
  const startAdCtx = mockedContext({
    method: "PUT",
    query: { event: startEvent.getName() },
    body: {
      referrerId: props.referrerId,
      refereeId: props.refereeId,
    } as IApiReqWatchingAdAction,
  });
  await channelEvents(startAdCtx.req, startAdCtx.res);
}

async function sendFinishEvent(props: {
  referrerId: string;
  refereeId: string;
}) {
  const event = WebSocketEventName.event("finish-watching-ad");

  const finishAdCtx = mockedContext({
    method: "PUT",
    query: { event: event.getName() },
    body: {
      referrerId: props.referrerId,
      refereeId: props.refereeId,
    } as IApiReqWatchingAdAction,
  });

  await futureTimeout(async () => {
    await channelEvents(finishAdCtx.req, finishAdCtx.res);
  }, AdDuration.defaultTime().milliseconds + 1000);

  return finishAdCtx.res;
}
