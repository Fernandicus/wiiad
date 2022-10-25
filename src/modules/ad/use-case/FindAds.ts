import { UniqId } from "@/src/utils/UniqId";
import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdImageUrl } from "../domain/value-objects/AdImageUrl";
import { AdRedirectionUrl } from "../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../domain/value-objects/AdSegments";
import { AdTitle } from "../domain/value-objects/AdTitle";

export class FindAds {
  constructor(private repository: AdRepository) {}

  async findAllByAdvertiserId(id: UniqId): Promise<Ad[] | null> {
    const adsFound = await this.repository.findAllByAdvertiserId(id.id);
    if (!adsFound) return null;
    return adsFound.map((ad): Ad => {
      return new Ad({
        id: new UniqId(ad.id),
        advertiserId: new UniqId(ad.advertiserId),
        title: new AdTitle(ad.title),
        description: new AdDescription(ad.description),
        image: new AdImageUrl(ad.image),
        redirectionUrl: new AdRedirectionUrl(ad.redirectionUrl),
        segments: new AdSegments(ad.segments),
      });
    });
  }

  async findByAdId(id: UniqId): Promise<Ad | null> {
    const adFound = await this.repository.findByAdId(id.id);
    if (!adFound) return null;
    return new Ad({
      id: new UniqId(adFound.id),
      advertiserId: new UniqId(adFound.advertiserId),
      title: new AdTitle(adFound.title),
      description: new AdDescription(adFound.description),
      image: new AdImageUrl(adFound.image),
      redirectionUrl: new AdRedirectionUrl(adFound.redirectionUrl),
      segments: new AdSegments(adFound.segments),
    });
  }
}
