import { Folder } from "@/src/modules/storage/domain/Folder";
import { ICloudStorageRepo } from "@/src/modules/storage/domain/interfaces/ICloudStorageRepo";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";

export const mockedCloudStorageRepo = (): ICloudStorageRepo => {
  return {
    getSignedData: (folder) => ({
      api_key: "_apiKey_",
      signature: "_signature_",
      signedParams: { folder: folder.path },
      timestamp: Date.now(),
    }),
  };
};
