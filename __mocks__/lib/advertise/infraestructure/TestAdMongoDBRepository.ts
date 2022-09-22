import { AdModel, AdModelProps } from "@/src/ad/infraestructure/AdModel";
import mongoose from "mongoose";
import { TestRepository } from "../domain/TestRepository";

export class TestAdMongoDBRepository implements TestRepository {
  constructor() {}

  static async connect(): Promise<TestAdMongoDBRepository> {
    const mongoIsDisonnected =
      mongoose.connection.readyState === mongoose.ConnectionStates.disconnected;

    if (mongoIsDisonnected) {
      const mongoDBUrl = process.env.MONGODB_URL;
      if (!mongoDBUrl) throw new Error("DB url doesn't provided");
      await mongoose.connect(mongoDBUrl);
    }
    return new TestAdMongoDBRepository();
  }

  async disconnect(adsModel: AdModelProps[]): Promise<void> {
    await mongoose.disconnect();
  }

  async saveMany(adsModel: AdModelProps[]): Promise<void> {
    await AdModel.insertMany(adsModel);
  }
}
