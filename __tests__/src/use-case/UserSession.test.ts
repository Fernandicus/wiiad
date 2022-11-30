import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { AuthCookie } from "@/src/modules/session/infrastructure/AuthCookie";
import { JsonWebTokenNPM } from "@/src/modules/session/infrastructure/JsonWebTokenNPM";
import { UserSession } from "@/src/modules/session/use-case/UserSession";
import { FakeAdvertiser } from "../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import  {Mocks } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import { mockedContext } from "../../../__mocks__/context/MockContext";

describe("On UserSession, GIVEN an Advertiser", () => {
  let fakeAdvertiser: AdvertiserPropsPrimitives;
  let userSession: UserSession;
  let context: Mocks<NextApiRequest, NextApiResponse>

  beforeAll(() => {
    fakeAdvertiser = FakeAdvertiser.createPrimitives();
    const authCookie = new AuthCookie();
    const jwtRepo = new JsonWebTokenNPM();
    userSession = new UserSession(authCookie, jwtRepo);
    context = mockedContext();
  });

  it(`WHEN call the setFromServer and pass an advertiser as a payload, 
  THEN when call getFromServer the session should contain the advertiser data`, () => {
    userSession.setFromServer(context, { ...fakeAdvertiser });
    const session = userSession.getFromServer(context);

    expect(session?.email).toBe(fakeAdvertiser.email);
    expect(session?.id).toBe(fakeAdvertiser.id);
    expect(session?.name).toBe(fakeAdvertiser.name);
    expect(session?.role).toBe(fakeAdvertiser.role);
  });

  it(`WHEN call the remove, 
  THEN when call getFromServer the session shouldn't return null`, () => {
    userSession.remove(context);
    const session = userSession.getFromServer(context);

    expect(session).toBe(null);
  });
});
