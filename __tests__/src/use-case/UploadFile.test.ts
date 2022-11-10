import { ICloudStorageRepo } from "@/src/domain/ICloudStorageRepo";
import { UploadFile } from "@/src/use-case/UploadFile";
import { mockedCloudStorageRepo } from "../../../__mocks__/context/MockCloudStorageRepo";

describe("On UploadFile, GIVEN an some 'files'", () => {
  let mockedRepo: ICloudStorageRepo;

  beforeAll(() => {
    mockedRepo = mockedCloudStorageRepo();
  });

  it(`WHEN upload image, THEN return url`, async () => {
    const upload = new UploadFile(mockedRepo);
    const file = "some-file";
    const path = "some/path/here/";
    const url = await upload.image(file, path);

    expect(url).not.toBe(null);
    expect(url).toEqual(path + file);
  });
});
