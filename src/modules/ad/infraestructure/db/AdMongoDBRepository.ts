import { UniqId } from "@/src/utils/UniqId";
import { AdTitle } from "../../domain/value-objects/AdTitle";
import { Ad } from "../../domain/Ad";
import { IAdRepository } from "../../domain/interfaces/IAdRepository";
import { AdDescription } from "../../domain/value-objects/AdDescription";
import { AdFileUrl } from "../../domain/value-objects/AdFileUrl";
import { AdRedirectionUrl } from "../../domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "../../domain/value-objects/AdSegments";
import { AdModel, IAdModelProps } from "./AdModel";

export class AdMongoDBRepository implements IAdRepository {
  public async save(ad: Ad): Promise<void> {
    await AdModel.create({
      ...ad.toPrimitives(),
      _id: ad.id.id,
    } as IAdModelProps);
  }

  public async findAllByAdvertiserId(id: UniqId): Promise<Ad[] | null> {
    const adModel = await AdModel.find<IAdModelProps>({
      advertiserId: id.id,
    } as IAdModelProps);

    const adsArray = adModel.map((model): Ad => {
      return this.toAd(model);
    });

    if (adsArray.length == 0) return null;

    return adsArray;
  }

  async findByAdId(id: UniqId): Promise<Ad | null> {
    const adModel = await AdModel.findById<IAdModelProps>(id.id);
    if (!adModel) return null;
    return this.toAd(adModel);
  }

  public async remove(id: UniqId): Promise<void> {
    await AdModel.findByIdAndRemove({ _id: id.id } as IAdModelProps);
  }

  private toAd(adModel: IAdModelProps): Ad {
    return new Ad({
      id: new UniqId(adModel._id),
      title: new AdTitle(adModel.title),
      description: new AdDescription(adModel.description),
      file: new AdFileUrl(adModel.file),
      redirectionUrl: new AdRedirectionUrl(adModel.redirectionUrl),
      segments:  AdSegments.filterByAvailables(adModel.segments),
      advertiserId: new UniqId(adModel.advertiserId),
    });
  }
}
