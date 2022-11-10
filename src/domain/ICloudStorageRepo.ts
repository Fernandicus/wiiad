
export interface ICloudStorageRepo{
    uploadImageAndGetUrl(file: string, folderPath:string):Promise<string>;
    uploadVideoAndGetUrl(file: string, folderPath:string):Promise<string>;
}