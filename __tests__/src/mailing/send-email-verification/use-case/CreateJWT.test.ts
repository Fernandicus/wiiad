import {
  Advertiser,
  AdvertiserPropsPrimitives,
} from "@/src/advertiser/domain/Advertiser";
import { IUser } from "@/src/domain/IUser";
import { JsonWebTokenNPM } from "@/src/mailing/send-email-verification/infrastructure/JsonWebTokenNPM";
import { ManageJWT } from "@/src/mailing/send-email-verification/use-case/ManageJWT";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/advertiser/FakeAdvertiser";

describe("On ManageJWT, GIVEN an Advertiser and a IJsonWebTokenRepo", () => {
  let advertiser: AdvertiserPropsPrimitives;
  let jwtmanager: ManageJWT;

  beforeAll(() => {
    advertiser = FakeAdvertiser.createPrimitives();
    const jwtInfraestructure = new JsonWebTokenNPM();
    jwtmanager = new ManageJWT(jwtInfraestructure);
  });

  test(`WHEN call the ManageJWT advertiserToken, 
  THEN return a jwt with all the advertiser data`, () => {
    const token = jwtmanager.createToken(advertiser);
    const decoded = jwtmanager.decodeToken<AdvertiserPropsPrimitives>(token);
    expect(decoded.email).toBe(advertiser.email);
    expect(decoded.id).toBe(advertiser.id);
    expect(decoded.name).toBe(advertiser.name);
    expect(decoded.rol).toBe(advertiser.rol);
  });
});
