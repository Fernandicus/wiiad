import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { Repository } from "../domain/Repository";
import { AdDescription } from "../domain/ValueObjects/AdDescription";
import { AdId } from "../domain/ValueObjects/AdId";
import { AdImage } from "../domain/ValueObjects/AdImage";
import { AdRedirectionUrl } from "../domain/ValueObjects/AdRedirectionUrl";
import { AdSegments } from "../domain/ValueObjects/AdSegments";
import { AdTitle } from "../domain/ValueObjects/AdTitle";
import { AdvertiserId } from "../domain/ValueObjects/AdvertiserId";
import { AdUniqId } from "../infraestructure/AdUniqId";
import { CreateAd } from "../use-case/CreateAd";

export class AdCreatorController {
  private createAd;
  private ad;

  constructor(adProps: AdPropsPrimitives, repository: Repository) {
    const id = AdUniqId.generate();
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

  async create() {
    await this.createAd.save(this.ad);
  }
}
