import { Ad, AdPropsPrimitives } from "../../domain/Ad";
import { AdDescription } from "../../domain/value-objects/AdDescription";
import { AdFileUrl } from "../../domain/value-objects/AdFileUrl";
import { AdRedirectionUrl } from "../../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../../domain/value-objects/AdSegments";
import { AdTitle } from "../../domain/value-objects/AdTitle";
import { UniqId } from "@/src/common/domain/UniqId";
import { CreateAd } from "../CreateAd";

/* interface CreateAdParams {
  adProps: AdPropsPrimitives;
  advertiserId: string;
  adId: string;
} */

export class AdCreatorHandler {
  constructor(private createAd: CreateAd) {}

  async create(adProps: AdPropsPrimitives): Promise<void> {
    const ad = new Ad({
      id: new UniqId(adProps.id),
      segments: AdSegments.filterByAvailables(adProps.segments),
      title: new AdTitle(adProps.title),
      description: new AdDescription(adProps.description),
      file: new AdFileUrl(adProps.file),
      redirectionUrl: new AdRedirectionUrl(adProps.redirectionUrl),
      advertiserId: new UniqId(adProps.advertiserId),
    });
    await this.createAd.save(ad);
  }
}
