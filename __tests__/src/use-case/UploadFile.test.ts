import { Folder } from "@/src/modules/storage/domain/Folder";
import { ICloudStorageRepo } from "@/src/modules/storage/domain/interfaces/ICloudStorageRepo";
import { UploadFile } from "@/src/modules/storage/use-case/UploadFile";
import { mockedCloudStorageRepo } from "../../../__mocks__/context/MockCloudStorageRepo";

describe("On UploadFile, GIVEN an some 'files'", () => {
  let mockedRepo: ICloudStorageRepo;
  let upload: UploadFile;
  let folder: Folder;
  let file: string;

  beforeAll(() => {
    mockedRepo = mockedCloudStorageRepo();
    folder = new Folder("testing/");
    upload = new UploadFile(mockedRepo);
    file = "some-file";
  });

  it(`WHEN upload image, THEN return url`, async () => {
    const url = await upload.adBanner(file, folder);

    expect(url).not.toBe(null);
    expect(url.file).toEqual(folder.path + file);
  });
});
