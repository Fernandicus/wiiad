import { ICloudStorageRepo } from "@/src/domain/ICloudStorageRepo";


export const mockedCloudStorageRepo = () : ICloudStorageRepo => {
  return {
    uploadImageAndGetUrl: jest
      .fn()
      .mockImplementation((file: string, path: string) :string => path + file),
    uploadVideoAndGetUrl: jest.fn(),
  };
};
