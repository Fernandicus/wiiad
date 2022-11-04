import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdImageUrl } from "../domain/value-objects/AdImageUrl";
import { AdRedirectionUrl } from "../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../domain/value-objects/AdSegments";
import { AdTitle } from "../domain/value-objects/AdTitle";
import { UniqId } from "@/src/utils/UniqId";
import { CreateAd } from "../use-case/CreateAd";

interface CreateAdParams {
  adProps: AdPropsPrimitives;
  advertiserId: string;
  adId: string;
}

export class AdCreatorHandler {
  constructor(private createAd: CreateAd) {}

  async create({ adProps, adId, advertiserId }: CreateAdParams): Promise<void> {
    const ad = new Ad({
      id: new UniqId(adId),
      segments: new AdSegments(adProps.segments),
      title: new AdTitle(adProps.title),
      description: new AdDescription(adProps.description),
      image: new AdImageUrl(adProps.image),
      redirectionUrl: new AdRedirectionUrl(adProps.redirectionUrl),
      advertiserId: new UniqId(advertiserId),
    });
    await this.createAd.save(ad);
  }
}
