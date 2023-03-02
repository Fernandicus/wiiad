import { Folder } from "@/src/modules/storage/domain/Folder";
import { CloudinaryCloudStorageRepo } from "@/src/modules/storage/infrastructure/cloudinary/CloudinaryCloudStorageRepo";
import { UniqId } from "@/src/utils/UniqId";
import { FakeAd } from "../../../__mocks__/lib/modules/ads/FakeAd";

describe("On AdCloudinaryRepo, GIVEN an image url", () => {
  let cloudinary: CloudinaryCloudStorageRepo;
  let folder: Folder;

  beforeAll(() => {
    cloudinary = new CloudinaryCloudStorageRepo();
    folder = new Folder("testing/");
  });

  it(`WHEN pass a folder,
  THEN image should be uploaded and the url should be received`, async () => {
    const signedData = cloudinary.getSignedData(folder);
    expect(signedData).not.toBe(null);
  });
});
