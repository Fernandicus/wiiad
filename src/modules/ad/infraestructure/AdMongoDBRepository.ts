import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";
import { AdModel, AdModelProps } from "./AdModel";

export class AdMongoDBRepository implements AdRepository {
  public async save(ad: AdPropsPrimitives): Promise<void> {
    const adModel = new AdModel({
      _id: ad.id,
      ...ad,
    });
    console.log("SAVE ADMODEL ,", adModel)
    await adModel.save();
  }

  public async findAllByAdvertiserId(id: string): Promise<AdPropsPrimitives[]> {
    const adModel = await AdModel.find<AdModelProps>({
      advertiserId: id,
    });
    const adPrimitivesArray = adModel.map((model): AdPropsPrimitives => {
      return {
        id: model._id,
        ...model,
        /* title: model.title,
        description: model.description,
        image: model.image,
        redirectionUrl: model.redirectionUrl,
        segments: model.segments,
        advertiserId: model.advertiserId, */
      };
    });

    return adPrimitivesArray;
  }

  public async remove(id: string): Promise<void> {
    await AdModel.findByIdAndRemove({ _id: id });
  }
}
