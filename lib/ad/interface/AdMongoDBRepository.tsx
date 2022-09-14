import {DataBase} from "../domain/DataBase";

export class AdMongoDBRepository implements DataBase {
  constructor() {
    const mongoDBUrl: string = process.env.MONGODB_URL ?? "";
  }

  async save(value: unknown): Promise<void> {}
}
