import { AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";
import { AdvertiserModel, AdvertiserModelProps } from "./AdvertiserModel";

export class AdvertiserMongoDBRepo implements AdvertiserRepo {
  async findByName(name: string): Promise<AdvertiserPropsPrimitives | null> {
    const advertiserModel = await AdvertiserModel.findOne<AdvertiserModelProps>(
      { name }
    );
    return this.returnAdvertiser(advertiserModel);
  }

  async save(model: AdvertiserPropsPrimitives): Promise<void> {
    const advertiserModel = new AdvertiserModel({ _id: model.id, ...model });
    await advertiserModel.save();
  }

  async findById(id: string): Promise<AdvertiserPropsPrimitives | null> {
    const advertiserModel =
      await AdvertiserModel.findById<AdvertiserModelProps>(id);
    return this.returnAdvertiser(advertiserModel);
  }

  async findByEmail(email: string): Promise<AdvertiserPropsPrimitives | null> {
    const advertiserModel = await AdvertiserModel.findOne<AdvertiserModelProps>(
      { email }
    );
    return this.returnAdvertiser(advertiserModel);
  }

  private returnAdvertiser(
    advertiser: AdvertiserModelProps | null
  ): AdvertiserPropsPrimitives | null {
    if (!advertiser) return null;
    return {
      id: advertiser._id,
      name: advertiser.name,
      email: advertiser.email,
      role: advertiser.role,
      profilePic: advertiser.profilePic
    };
  }
}
