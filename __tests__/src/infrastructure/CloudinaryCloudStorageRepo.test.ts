import { CloudinaryCloudStorageRepo } from "@/src/infrastructure/CloudinaryCloudStorageRepo";
import { UniqId } from "@/src/utils/UniqId";
import { FakeAd } from "../../../__mocks__/lib/modules/ads/FakeAd";

describe("On AdCloudinaryRepo, GIVEN an image url", () => {
  let cloudinary: CloudinaryCloudStorageRepo;
  let imageUrl: string;
  const testPath = 'testing'

  beforeAll(() => {
    cloudinary = new CloudinaryCloudStorageRepo();
    const fakeAd = FakeAd.createWithPrimitives(UniqId.generate());
    imageUrl = fakeAd.image;
  });

  it(`WHEN pass an image url to uploadImageAndGetUrl,
  THEN image should be uploaded and the url should be reczeived`, async () => {
    const url = await cloudinary.uploadImageAndGetUrl(imageUrl, testPath);
    expect(url).not.toBe(null);
  });
});
