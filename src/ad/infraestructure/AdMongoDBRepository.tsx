
import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { Repository } from "../domain/Repository";
import { AdModel, AdModelProps } from "./AdModel";

export class AdMongoDBRepository implements Repository {

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
    const adModel = await AdModel.find<AdModelProps>({
      advertiserId: id,
    });

    const adPrimitivesArray = adModel.map((model): AdPropsPrimitives => {
      return {
        id: model._id,
        title: model.title,
        description: model.description,
        image: model.image,
        redirectionUrl: model.redirectionUrl,
        segments: model.segments,
        advertiserId: model.advertiserId,
      };
    });

    return adPrimitivesArray;
  }

  public async remove(id: string): Promise<void> {
    await AdModel.findByIdAndRemove({_id: id});
  }
}
