import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdImageUrl } from "@/src/modules/ad/domain/value-objects/AdImageUrl";
import { AdRedirectionUrl } from "@/src/modules/ad/domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import {
  AdModel,
  AdModelProps,
} from "@/src/modules/ad/infraestructure/AdModel";
import { UniqId } from "@/src/utils/UniqId";
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
    const models = ads.map((ad): AdModelProps => {
      return {
        ...ad.toPrimitives(),
        _id: ad.id.id,
      };
    });
    await AdModel.insertMany<AdModelProps>(models);
  }

  async getAllAds(): Promise<Ad[] | null> {
    await TestMongoDB.connectMongoDB();
    const ads = await AdModel.find<AdModelProps>();
    if (ads.length == 0) return null;
    const adsPrimitives = ads.map((ad): Ad => {
      return new Ad({
        id: new UniqId(ad._id),
        title: new AdTitle(ad.title),
        description: new AdDescription(ad.description),
        image: new AdImageUrl(ad.image),
        redirectionUrl: new AdRedirectionUrl(ad.redirectionUrl),
        segments: new AdSegments(ad.segments),
        advertiserId: new UniqId(ad.advertiserId),
      });
    });
    return adsPrimitives;
  }
}
