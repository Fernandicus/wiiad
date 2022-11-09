import { UniqId } from "@/src/utils/UniqId";
import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdImageUrl } from "../domain/value-objects/AdImageUrl";
import { AdRedirectionUrl } from "../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../domain/value-objects/AdSegments";
import { AdTitle } from "../domain/value-objects/AdTitle";
import { AdModel, AdModelProps } from "./AdModel";

export class AdMongoDBRepository implements AdRepository {
  public async save(ad: Ad): Promise<void> {
    await AdModel.create({
      ...ad.toPrimitives(),
      _id: ad.id.id,
    } as AdModelProps);
  }

  public async findAllByAdvertiserId(id: UniqId): Promise<Ad[] | null> {
    const adModel = await AdModel.find<AdModelProps>({
      advertiserId: id.id,
    } as AdModelProps);

    const adsArray = adModel.map((model): Ad => {
      return this.toAd(model);
    });

    if (adsArray.length == 0) return null;

    return adsArray;
  }

  async findByAdId(id: UniqId): Promise<Ad | null> {
    const adModel = await AdModel.findById<AdModelProps>(id.id);
    if (!adModel) return null;
    return this.toAd(adModel);
  }

  public async remove(id: UniqId): Promise<void> {
    await AdModel.findByIdAndRemove({ _id: id.id } as AdModelProps);
  }

  private toAd(adModel: AdModelProps): Ad {
    return new Ad({
      id: new UniqId(adModel._id),
      title: new AdTitle(adModel.title),
      description: new AdDescription(adModel.description),
      image: new AdImageUrl(adModel.image),
      redirectionUrl: new AdRedirectionUrl(adModel.redirectionUrl),
      segments: new AdSegments(adModel.segments),
      advertiserId: new UniqId(adModel.advertiserId),
    });
  }
}
