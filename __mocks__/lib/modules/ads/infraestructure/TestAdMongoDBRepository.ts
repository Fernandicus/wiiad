import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";
import { AdRedirectionUrl } from "@/src/modules/ad/domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import {
  AdModel,
  IAdModelProps,
} from "@/src/modules/ad/infraestructure/db/AdModel";
import { UniqId } from "@/src/common/domain/UniqId";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../infrastructure/TestMongoDB";
import { TestAdRepository } from "../domain/TestAdRepository";

export class TestAdMongoDBRepository
  extends TestMongoDB
  implements TestAdRepository
{
  static async init(): Promise<TestAdMongoDBRepository> {
    await this.connectAndCleanModel(
      mongoose.model(AdModel.modelName, AdModel.schema)
    );
    return new TestAdMongoDBRepository();
  }

  async saveMany(ads: Ad[]): Promise<void> {
    await TestMongoDB.connectMongoDB();
    const models = ads.map((ad): IAdModelProps => {
      return {
        ...ad.toPrimitives(),
        _id: ad.id.id,
      };
    });
    await AdModel.insertMany<IAdModelProps>(models);
  }

  async getAllAds(): Promise<Ad[] | null> {
    await TestMongoDB.connectMongoDB();
    const ads = await AdModel.find<IAdModelProps>();
    if (ads.length == 0) return null;
    const adsPrimitives = ads.map((ad): Ad => {
      return new Ad({
        id: new UniqId(ad._id),
        title: new AdTitle(ad.title),
        description: new AdDescription(ad.description),
        file: new AdFileUrl(ad.file),
        redirectionUrl: new AdRedirectionUrl(ad.redirectionUrl),
        segments:  AdSegments.filterByAvailables(ad.segments),
        advertiserId: new UniqId(ad.advertiserId),
      });
    });
    return adsPrimitives;
  }
}
