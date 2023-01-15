import {
  getServerSideProps as watchAdsPage,
  IWatchCampaignPage,
} from "@/pages/[userName]/index";
import httpMock, { MockRequest } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { FakeUser } from "../../../__mocks__/lib/modules/user/FakeUser";
import { UniqId } from "@/src/utils/UniqId";
import { IUserPrimitives, User } from "@/src/modules/users/user/domain/User";
import { TestDBs } from "../../../__mocks__/lib/infrastructure/db/TestDBs";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

interface IServerSideResponse {
  props: {};
  redirect: { destination: string };
}

describe("On getServerSideProps WatchAd, GIVEN a user and some Active Campaigns", () => {
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;
  let influencer: User;
  let myUser: IUserPrimitives;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    userSession.remove({ req, res });
    const { users } = await TestDBs.setAndInitAll();
    influencer = users[0];
    myUser = FakeUser.createWithPrimitives(UniqId.generate());
  });

  it(`WHEN access to url without user session,
  THEN response should be all active campaigns`, async () => {
    const resp = (await watchAdsPage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: influencer.name.name,
      },
    })) as { props: IWatchCampaignPage };

    expect(resp.props.campaign).not.toBe(null);
    expect(resp.props.ad).not.toBe(null);
  });

  it(`WHEN access to my user name url,
  THEN response should contain destination "/profile"`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);

    const resp = (await watchAdsPage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: myUser.name,
      },
    })) as IServerSideResponse;

    expect(resp.redirect.destination).toBe("/profile");
  });

  it(`WHEN access to an influencer url,
  THEN response should have an active campaign and ad`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);
    const resp = (await watchAdsPage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: influencer.name.name,
      },
    })) as { props: IWatchCampaignPage };

    const campaign = resp.props.campaign as ICampaignPrimitives;
    const ad = resp.props.ad as AdPropsPrimitives;
    const user = resp.props.user as IUserPrimitives;
    const referrer = resp.props.referrer as IUserPrimitives;

    expect(campaign).not.toBe(undefined);
    expect(ad.id).toBe(campaign.adId);
    expect(user.id).toBe(myUser.id);
    expect(referrer.id).toBe(influencer.id.id);
  });

  it(`WHEN access to a not existing influencer url,
  THEN response should return a redirect address`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);
    const resp = (await watchAdsPage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: faker.name.firstName(),
      },
    })) as IServerSideResponse;

    expect(resp.redirect).not.toBe(undefined);
  });
});
