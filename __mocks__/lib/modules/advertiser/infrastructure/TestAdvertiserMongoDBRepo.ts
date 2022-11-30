import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role } from "@/src/common/domain/Role";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  Advertiser,
  AdvertiserPropsPrimitives,
} from "@/src/modules/advertiser/domain/Advertiser";
import {
  AdvertiserModel,
  IAdvertiserModel,
} from "@/src/modules/advertiser/infraestructure/AdvertiserModel";
import { UniqId } from "@/src/utils/UniqId";
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

  async saveMany(advertiser: Advertiser[]): Promise<void> {
    await TestMongoDB.connectMongoDB();
    const models = advertiser.map((advertiser): IAdvertiserModel => {
      return {
        ...advertiser.toPrimitives(),
        _id: advertiser.id.id,
      };
    });
    await AdvertiserModel.insertMany<IAdvertiserModel>(models);
  }

  async getAllAdvertisers(): Promise<Advertiser[] | null> {
    await TestMongoDB.connectMongoDB();
    const advertiserModels = await AdvertiserModel.find<IAdvertiserModel>();
    if (advertiserModels.length == 0) return null;
    const advertisers = advertiserModels.map((advertiser) => {
      return new Advertiser({
        id: new UniqId(advertiser._id),
        name: new Name(advertiser.name),
        email: new Email(advertiser.email),
        role: new Role(advertiser.role),
        profilePic: new ProfilePic(advertiser.profilePic),
      });
    });
    return advertisers;
  }
}
