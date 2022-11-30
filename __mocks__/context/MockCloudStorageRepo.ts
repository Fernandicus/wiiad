import { Folder } from "@/src/modules/storage/domain/Folder";
import { ICloudStorageRepo } from "@/src/modules/storage/domain/interfaces/ICloudStorageRepo";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";

export const mockedCloudStorageRepo = (): ICloudStorageRepo => {
  return {
    uploadBannerAndGetUrl: jest
      .fn()
      .mockImplementation((file: string, folder: Folder): AdFileUrl => new AdFileUrl(folder.path + file)),
    uploadVideoAndGetUrl: jest.fn(),
  };
};
