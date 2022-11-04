
export interface ICloudStorageRepo{
    uploadImageAndGetUrl(filePath: string, folder:string):Promise<string>;
}