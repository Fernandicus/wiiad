import { Folder } from "@/src/domain/Folder";
import { CloudinaryCloudStorageRepo } from "@/src/infrastructure/CloudinaryCloudStorageRepo";
import { UniqId } from "@/src/utils/UniqId";
import { FakeAd } from "../../../__mocks__/lib/modules/ads/FakeAd";

describe("On AdCloudinaryRepo, GIVEN an image url", () => {
  let cloudinary: CloudinaryCloudStorageRepo;
  let imageUrl: string;
  let folder: Folder;

  beforeAll(() => {
    cloudinary = new CloudinaryCloudStorageRepo();
    const fakeAd = FakeAd.createWithPrimitives(UniqId.generate());
    imageUrl = fakeAd.file;
    folder = new Folder("testing/");
  });

  it(`WHEN pass an image url to uploadImageAndGetUrl,
  THEN image should be uploaded and the url should be reczeived`, async () => {
    const url = await cloudinary.uploadBannerAndGetUrl(imageUrl, folder);
    expect(url).not.toBe(null);
  });
});
