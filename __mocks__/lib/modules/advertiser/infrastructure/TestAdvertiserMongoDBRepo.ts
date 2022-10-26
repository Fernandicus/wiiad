import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import {
  AdvertiserModel,
  AdvertiserModelProps,
} from "@/src/modules/advertiser/infraestructure/AdvertiserModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestAdvertiserRepository } from "../domain/TestAdvertiserRepository";

export class TestAdvertiserMongoDBRepo
  extends TestMongoDB
  implements TestAdvertiserRepository
{
  static async init(): Promise<TestAdvertiserMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(AdvertiserModel.modelName, AdvertiserModel.schema)
    );
    return new TestAdvertiserMongoDBRepo();
  }

  async saveMany(
    advertiserPrimitives: AdvertiserPropsPrimitives[]
  ): Promise<void> {
    const models = advertiserPrimitives.map(
      (advertiser): AdvertiserModelProps => {
        return {
          _id: advertiser.id,
          email: advertiser.email,
          name: advertiser.name,
          rol: advertiser.rol,
        };
      }
    );
    await AdvertiserModel.insertMany(models);
  }

  async getAllAdvertisers(): Promise<AdvertiserPropsPrimitives[] | null> {
    const advertisers = await AdvertiserModel.find<AdvertiserModelProps>();
    if (advertisers.length == 0) return null;
    const advertisersPrimitives = advertisers.map(
      (advertiser): AdvertiserPropsPrimitives => {
        return {
          id: advertiser._id,
          email: advertiser.email,
          name: advertiser.name,
          rol: advertiser.rol,
        };
      }
    );
    return advertisersPrimitives;
  }
}
