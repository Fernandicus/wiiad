import api_v1_CloudinarySignBannerRequest from "@/pages/api/v1/auth/cloudinary/banner-sign-request";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { UniqId } from "@/src/utils/UniqId";
import { FakeUser } from "../../../../../__mocks__/lib/modules/user/FakeUser";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { ICloudinarySignedParams } from "@/src/modules/storage/infrastructure/cloudinary/CloudinaryCloudStorageRepo";
import { Folder } from "@/src/modules/storage/domain/Folder";

describe("On api/v1/auth/cloudinary/banner-sign-request", () => {
  it(`WHEN send a not 'GET' request,
  THEN a 400 status code should be returned`, async () => {
    const { req, res } = mockedContext({ method: "POST" });

    await api_v1_CloudinarySignBannerRequest(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a 'GET' request without a user session,
  THEN a 400 status code should be returned`, async () => {
    const { req, res } = mockedContext({ method: "GET" });

    await api_v1_CloudinarySignBannerRequest(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a 'GET' request with a user session with a role of User,
  THEN a 400 status code should be returned`, async () => {
    const user = FakeUser.create(UniqId.new());
    const { req, res } = mockedContext({ method: "GET" });
    userSession.setFromServer({ req, res }, user.toPrimitives());

    await api_v1_CloudinarySignBannerRequest(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a 'GET' request with a user session with a role of Advertiser,
  THEN a 200 status code should be returned and response should contain api_key, signature, etc`, async () => {
    const advertiser = FakeAdvertiser.create();
    const { req, res } = mockedContext({ method: "GET" });
    userSession.setFromServer({ req, res }, advertiser.toPrimitives());

    await api_v1_CloudinarySignBannerRequest(req, res);

    const responseJSON = res._getData();
    const response: ICloudinarySignedParams = JSON.parse(responseJSON);

    expect(res.statusCode).toBe(200);
    expect(response.api_key).not.toBeUndefined();
    expect(response.signature).not.toBeUndefined();
    expect(response.signedParams).not.toBeUndefined();
    expect(response.timestamp).not.toBeUndefined();
    expect(response.signedParams.folder).toEqual(Folder.bannerAd(advertiser.name).path)
    
  });
});
