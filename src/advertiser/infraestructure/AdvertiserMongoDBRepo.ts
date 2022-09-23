import { AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";

export class AdvertiserMongoDBRepo implements AdvertiserRepo {
  constructor() {}

  async save(model: AdvertiserPropsPrimitives): Promise<void> {}

  async findAllByAdvertiserId(
    id: string
  ): Promise<AdvertiserPropsPrimitives[]> {
    return [
      {
        email: "email",
        id: "id",
        name: "name",
        password: "pwd",
        rol: "rol",
      },
    ];
  }
}
