import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdId } from "../domain/value-objects/AdId";
import { AdImage } from "../domain/value-objects/AdImage";
import { AdRedirectionUrl } from "../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../domain/value-objects/AdSegments";
import { AdTitle } from "../domain/value-objects/AdTitle";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { UniqId } from "../../utils/UniqId";
import { CreateAd } from "../use-case/CreateAd";

export class AdCreatorController {
  private createAd;
  private ad;

  constructor(adProps: AdPropsPrimitives, repository: AdRepository) {
    const id = UniqId.generate();
    this.ad = new Ad({
      id: new AdId(id),
      segments: new AdSegments(adProps.segments),
      title: new AdTitle(adProps.title),
      description: new AdDescription(adProps.description),
      image: new AdImage(adProps.image),
      redirectionUrl: new AdRedirectionUrl(adProps.redirectionUrl),
      advertiserId: new AdvertiserId(adProps.advertiserId),
    });
    this.createAd = new CreateAd(repository);
  }

  async create(): Promise<void> {
    await this.createAd.save(this.ad);
  }
}
