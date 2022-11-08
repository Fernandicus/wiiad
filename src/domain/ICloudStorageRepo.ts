
export interface ICloudStorageRepo{
    uploadImageAndGetUrl(filePath: string, folder:string):Promise<string>;
    uploadVideoAndGetUrl(filePath: string, folder:string):Promise<string>;
}