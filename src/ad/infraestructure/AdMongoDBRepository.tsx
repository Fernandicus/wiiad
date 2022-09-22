import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";
import { AdModel, AdModelProps } from "./AdModel";

export class AdMongoDBRepository implements AdRepository {
  public async save(ad: Ad): Promise<void> {
    const adModel = new AdModel({
      _id: ad.id.id,
      title: ad.title.title,
      description: ad.description.description,
      image: ad.image.image,
      redirectionUrl: ad.redirectionUrl.url,
      advertiserId: ad.advertiserId.id,
      segments: ad.segments.segments,
    });
    await adModel.save();
  }

  public async findAllByAdvertiserId(id: string): Promise<AdPropsPrimitives[]> {
    const adModels = await AdModel.find<AdModelProps>({
      advertiserId: id,
    });
    const adPrimitivesArray = adModels.map((model): AdPropsPrimitives => {
      return {
        id: model._id,
        ...model,
      };
    });
    return adPrimitivesArray;
  }

  public async remove(id: string): Promise<void> {
    await AdModel.findByIdAndRemove({ _id: id });
  }
}
