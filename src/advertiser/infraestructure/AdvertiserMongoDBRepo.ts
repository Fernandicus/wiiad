import { AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";
import { AdvertiserModel, AdvertiserModelProps } from "./AdvertiserModel";

export class AdvertiserMongoDBRepo implements AdvertiserRepo {
  constructor() {}

  async save(model: AdvertiserPropsPrimitives): Promise<void> {
    const advertiserModel = new AdvertiserModel({ _id: model.id, ...model });
    await advertiserModel.save();
  }

  async findById(id: string): Promise<AdvertiserPropsPrimitives | null> {
    const advertiserModel =
      await AdvertiserModel.findById<AdvertiserModelProps>(id);
    if (!advertiserModel) return null;
    return {
      id: advertiserModel._id,
      name: advertiserModel.name,
      email: advertiserModel.email,
      rol: advertiserModel.rol,
    };
  }
}
