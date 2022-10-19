
export interface IAdCloudStorageRepo{
    uploadImageAndGetUrl(imagePath: string):Promise<string>;
}