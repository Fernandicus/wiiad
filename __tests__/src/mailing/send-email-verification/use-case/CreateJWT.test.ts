import {
  Advertiser,
  AdvertiserPropsPrimitives,
} from "@/src/advertiser/domain/Advertiser";
import { JsonWebTokenNPM } from "@/src/mailing/send-email-verification/infrastructure/JsonWebTokenNPM";
import { ManageJWT } from "@/src/mailing/send-email-verification/use-case/ManageJWT";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/advertiser/FakeAdvertiser";

describe("On ManageJWT, GIVEN an Advertiser and a IJsonWebTokenRepo", () => {
  let advertiser: Advertiser;
  let jwtmanager: ManageJWT;

  beforeAll(() => {
    advertiser = FakeAdvertiser.create();
    const jwtInfraestructure = new JsonWebTokenNPM();
    jwtmanager = new ManageJWT(jwtInfraestructure);
  });

  test(`WHEN call the ManageJWT advertiserToken, 
  THEN return a jwt with all the advertiser data`, () => {
    const token = jwtmanager.createAdvertiserToken(advertiser);
    const decoded = jwtmanager.decodeToken<AdvertiserPropsPrimitives>(token);
    expect(decoded.email).toBe(advertiser.email.email);
    expect(decoded.id).toBe(advertiser.id.id);
    expect(decoded.name).toBe(advertiser.name.name);
    expect(decoded.rol).toBe(advertiser.rol.rol);
  });
});
