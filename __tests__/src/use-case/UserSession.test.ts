import { AdvertiserPropsPrimitives } from "@/src/advertiser/domain/Advertiser";
import { Auth } from "@/src/infrastructure/Auth";
import { JsonWebTokenNPM } from "@/src/infrastructure/JsonWebTokenNPM";
import { UserSession } from "@/src/use-case/UserSession";
import { FakeAdvertiser } from "../../../__mocks__/lib/advertiser/FakeAdvertiser";
import httpMock, { MockRequest, MockResponse, Cookies } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";

describe("On UserSession, GIVEN an Advertiser", () => {
  let fakeAdvertiser: AdvertiserPropsPrimitives;
  let userSession: UserSession;
  let res: MockResponse<NextApiResponse>;
  let req: MockRequest<NextApiRequest>;

  beforeAll(() => {
    fakeAdvertiser = FakeAdvertiser.createPrimitives();
    const auth = new Auth();
    const jwtRepo = new JsonWebTokenNPM();
    userSession = new UserSession(auth, jwtRepo);
    req = httpMock.createRequest();
    res = httpMock.createResponse();
  });

  it(`WHEN call the setFromServer and pass an advertiser as a payload, 
  THEN when call getFromServer the session should contain the advertiser data`, () => {
    userSession.setFromServer({ req, res }, { ...fakeAdvertiser });
    const session = userSession.getFromServer({ req, res });

    expect(session?.email).toBe(fakeAdvertiser.email);
    expect(session?.id).toBe(fakeAdvertiser.id);
    expect(session?.name).toBe(fakeAdvertiser.name);
    expect(session?.rol).toBe(fakeAdvertiser.rol);
  });
});
