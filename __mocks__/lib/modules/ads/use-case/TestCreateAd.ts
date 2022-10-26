import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdModelProps } from "@/src/modules/ad/infraestructure/AdModel";
import { TestAdRepository } from "../domain/TestAdRepository";

export class TestCreateAd {
  constructor(private repository: TestAdRepository) {}

  async saveMany(ads: Ad[]): Promise<void> {
    const adsPrimitves = this.toPrimitives(ads);
   
    await this.repository.saveMany(adsPrimitves);
  }

  private toPrimitives(ads: Ad[]): AdPropsPrimitives[] {
    const primitives = ads.map((ad): AdPropsPrimitives => {
      return {
        id: ad.id.id,
        advertiserId: ad.advertiserId.id,
        description: ad.description.description,
        image: ad.image.image,
        redirectionUrl: ad.redirectionUrl.url,
        segments: ad.segments.segments,
        title: ad.title.title,
      };
    });
    return primitives;
  }
}
