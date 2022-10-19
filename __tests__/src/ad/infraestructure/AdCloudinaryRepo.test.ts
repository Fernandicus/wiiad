import { AdCloudinaryRepo } from "@/src/modules/ad/infraestructure/AdCloudinaryRepo";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";

describe("On AdCloudinaryRepo, GIVEN an image url", () => {
  let cloudinary: AdCloudinaryRepo;
  let imageUrl: string;

  beforeAll(() => {
    cloudinary = new AdCloudinaryRepo();
    const fakeAd = FakeAd.createWithPrimitives("0");
    imageUrl = fakeAd.image;
  });

  it(`WHEN pass an image url to uploadImageAndGetUrl,
  THEN image should be uploaded and the url should be reczeived`, async () => {
    const url = await cloudinary.uploadImageAndGetUrl(imageUrl);
    expect(url).not.toBe(null);
  });
});
