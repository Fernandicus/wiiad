import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdId } from "../domain/value-objects/AdId";
import { AdImage } from "../domain/value-objects/AdImage";
import { AdRedirectionUrl } from "../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../domain/value-objects/AdSegments";
import { AdTitle } from "../domain/value-objects/AdTitle";
import { AdvertiserId } from "../../advertiser/domain/value-objects/AdvertiserId";
import { FindAds } from "../use-case/FindAds";

export class AdFinderHandler {
  constructor(private findAds: FindAds) {}

  async findAll(advertiserId: string): Promise<Ad[]> {
    const id = new AdvertiserId(advertiserId);
    const adsFound = await this.findAds.findAllByAdvertiserId(id);
    const ads = adsFound.map((ad) => {
      return new Ad({
        title: new AdTitle(ad.title),
        description: new AdDescription(ad.description),
        image: new AdImage(ad.image),
        advertiserId: new AdvertiserId(ad.advertiserId),
        id: new AdId(ad.id),
        redirectionUrl: new AdRedirectionUrl(ad.redirectionUrl),
        segments: new AdSegments(ad.segments),
      });
    });
    return ads;
  }

  async findAllToJSON(advertiserId: string): Promise<string> {
    const id = new AdvertiserId(advertiserId);
    const adsFound = await this.findAds.findAllByAdvertiserId(id);
    return JSON.stringify(adsFound);
  }
}
