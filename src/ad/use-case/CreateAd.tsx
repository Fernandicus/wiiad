import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";

export class CreateAd {
  constructor(private repository: AdRepository) {}

  async save(ad: Ad): Promise<void> {
    const adPrimitives: AdPropsPrimitives = {
      id: ad.id.id,
      title: ad.title.title,
      description: ad.description.description,
      image: ad.image.image,
      redirectionUrl: ad.redirectionUrl.url,
      advertiserId: ad.advertiserId.id,
      segments: ad.segments.segments,
    };
    await this.repository.save(adPrimitives);
  }
}
