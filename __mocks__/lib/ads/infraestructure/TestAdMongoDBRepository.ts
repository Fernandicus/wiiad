import { AdModel, AdModelProps } from "@/src/ad/infraestructure/AdModel";
import mongoose from "mongoose";

export class TestAdMongoDBRepository {
  constructor() {}

  static async connectAndClean(): Promise<TestAdMongoDBRepository> {
    const mongoIsDisonnected =
      mongoose.connection.readyState === mongoose.ConnectionStates.disconnected;

    if (mongoIsDisonnected) {
      const mongoDBUrl = process.env.MONGODB_URL;
      if (!mongoDBUrl) throw new Error("DB url doesn't provided");
      await mongoose.connect(mongoDBUrl);
    }
    await AdModel.deleteMany({});
    return new TestAdMongoDBRepository();
  }

  static async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  async saveMany(adsModel: AdModelProps[]): Promise<void> {
    await AdModel.insertMany(adsModel);
  }
}
