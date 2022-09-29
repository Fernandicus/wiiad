import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdId } from "../domain/value-objects/AdId";
import { AdImage } from "../domain/value-objects/AdImage";
import { AdRedirectionUrl } from "../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../domain/value-objects/AdSegments";
import { AdTitle } from "../domain/value-objects/AdTitle";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { UniqId } from "../../utils/UniqId";
import { CreateAd } from "../use-case/CreateAd";

export class AdCreatorHandler {
  constructor(private createAd: CreateAd) {}

  async create(adProps: AdPropsPrimitives): Promise<void> {
    const id = UniqId.generate();
    const ad = new Ad({
      id: new AdId(id),
      segments: new AdSegments(adProps.segments),
      title: new AdTitle(adProps.title),
      description: new AdDescription(adProps.description),
      image: new AdImage(adProps.image),
      redirectionUrl: new AdRedirectionUrl(adProps.redirectionUrl),
      advertiserId: new AdvertiserId(adProps.advertiserId),
    });
    await this.createAd.save(ad);
  }
}
