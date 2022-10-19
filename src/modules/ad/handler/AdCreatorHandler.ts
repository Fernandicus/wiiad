import { Ad } from "../domain/Ad";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdId } from "../domain/value-objects/AdId";
import { AdImageUrl } from "../domain/value-objects/AdImageUrl";
import { AdRedirectionUrl } from "../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../domain/value-objects/AdSegments";
import { AdTitle } from "../domain/value-objects/AdTitle";
import { AdvertiserId } from "@/src/modules/advertiser/domain/value-objects/AdvertiserId";
import { UniqId } from "@/src/utils/UniqId";
import { CreateAd } from "../use-case/CreateAd";
import { IAdCloudStorageRepo } from "../domain/IAdCloudStorageRepo";
import { ICreateAdBodyReq } from "@/pages/api/ads/create";
import { ImageBase64 } from "../domain/value-objects/ImageBase64";

export class AdCreatorHandler {
  constructor(
    private createAd: CreateAd,
    private cloudStorageRepo: IAdCloudStorageRepo
  ) {}

  async create(adProps: ICreateAdBodyReq, advertiserId: string): Promise<void> {
    const imageURL = await this.uploadImageAndGetUrl(adProps.image);
    const ad = this.createAdObject({ adProps, advertiserId, imageURL });
    await this.createAd.save(ad);
  }

  private createAdObject(props: {
    adProps: ICreateAdBodyReq;
    advertiserId: string;
    imageURL: string;
  }): Ad {
    const { adProps, advertiserId, imageURL } = props;
    const id = UniqId.generate();
    return new Ad({
      id: new AdId(id),
      segments: new AdSegments(adProps.segments),
      title: new AdTitle(adProps.title),
      description: new AdDescription(adProps.description),
      image: new AdImageUrl(imageURL),
      redirectionUrl: new AdRedirectionUrl(adProps.redirectionUrl),
      advertiserId: new AdvertiserId(advertiserId),
    });
  }

  private async uploadImageAndGetUrl(fileBase64: string): Promise<string> {
    const imageBase64 = new ImageBase64(fileBase64);
    const imageURL = await this.cloudStorageRepo.uploadImage(imageBase64);
    return imageURL;
  }
}
