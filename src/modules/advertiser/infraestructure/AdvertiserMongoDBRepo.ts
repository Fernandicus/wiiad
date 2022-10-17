import { AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";
import { AdvertiserModel, AdvertiserModelProps } from "./AdvertiserModel";

export class AdvertiserMongoDBRepo implements AdvertiserRepo {
  async findByName(name: string): Promise<AdvertiserPropsPrimitives | null> {
    const advertiserModel = await AdvertiserModel.findOne<AdvertiserModelProps>(
      { name }
    );
    return this.returnAdvertiser(advertiserModel);
    /* if (!advertiserModel) return null;
    return {
      id: advertiserModel._id,
      name: advertiserModel.name,
      email: advertiserModel.email,
      rol: advertiserModel.rol,
    }; */
  }

  async save(model: AdvertiserPropsPrimitives): Promise<void> {
    const advertiserModel = new AdvertiserModel({ _id: model.id, ...model });
    await advertiserModel.save();
  }

  async findById(id: string): Promise<AdvertiserPropsPrimitives | null> {
    const advertiserModel =
      await AdvertiserModel.findById<AdvertiserModelProps>(id);
      console.log(advertiserModel)
    return this.returnAdvertiser(advertiserModel);
    /* if (!advertiserModel) return null;
    return {
      id: advertiserModel._id,
      name: advertiserModel.name,
      email: advertiserModel.email,
      rol: advertiserModel.rol,
    }; */
  }

  async findByEmail(email: string): Promise<AdvertiserPropsPrimitives | null> {
    const advertiserModel = await AdvertiserModel.findOne<AdvertiserModelProps>(
      { email }
    );
    return this.returnAdvertiser(advertiserModel);
    /* if (!advertiserModel) return null;
    return {
      id: advertiserModel._id,
      name: advertiserModel.name,
      email: advertiserModel.email,
      rol: advertiserModel.rol,
    }; */
  }

  private returnAdvertiser(
    advertiser: AdvertiserModelProps | null
  ): AdvertiserPropsPrimitives | null {
    if (!advertiser) return null;
    return {
      id: advertiser._id,
      name: advertiser.name,
      email: advertiser.email,
      rol: advertiser.rol,
    };
  }
}
