import { Advertise } from "../domain/Advertise";
import Repository from "../domain/Repository";

export default class MongoDBAdRepository implements Repository {
  constructor() {
    const mongoDBUrl: string = process.env.MONGODB_URL ?? "";
  }

  async save(model: Advertise): Promise<void> {}
}
