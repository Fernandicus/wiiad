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

export class AdFinderController {
  private findAds;
  private advertiserId;

  constructor(advertiserId: string, repository: AdRepository) {
    this.findAds = new FindAds(repository);
    this.advertiserId = new AdvertiserId(advertiserId);
  }

  async findAll(): Promise<Ad[]> {
    const adsFound = await this.findAds.findAllByAdvertiserId(
      this.advertiserId
    );
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

  async findAllToJSON(): Promise<string> {
    const adsFound = await this.findAds.findAllByAdvertiserId(this.advertiserId);
    return JSON.stringify(adsFound);
  }
}
