import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";
import { AdRedirectionUrl } from "@/src/modules/ad/domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { UniqId } from "@/src/common/domain/UniqId";
import { CreateAd } from "../CreateAd";

export class CreateAdHandler {
  constructor(private createAd: CreateAd) {}

  async create(ad: AdPropsPrimitives): Promise<void> {
    const newAd = new Ad({
      id: new UniqId(ad.id),
      advertiserId: new UniqId(ad.advertiserId),
      title: new AdTitle(ad.title),
      description: new AdDescription(ad.description),
      redirectionUrl: new AdRedirectionUrl(ad.redirectionUrl),
      file: new AdFileUrl(ad.file),
      segments: AdSegments.filterByAvailables(ad.segments),
    });
    await this.createAd.create(newAd);
  }
}
