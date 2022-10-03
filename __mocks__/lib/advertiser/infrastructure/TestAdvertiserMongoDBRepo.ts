import { AdvertiserModel } from "@/src/advertiser/infraestructure/AdvertiserModel";
import mongoose from "mongoose";

export class TestAdvertiserMongoDBRepo{
    constructor() {}

    static async connectAndClean(): Promise<TestAdvertiserMongoDBRepo> {
      const mongoIsDisonnected =
        mongoose.connection.readyState === mongoose.ConnectionStates.disconnected;
  
      if (mongoIsDisonnected) {
        const mongoDBUrl = process.env.MONGODB_URL;
        if (!mongoDBUrl) throw new Error("DB url doesn't provided");
        await mongoose.connect(mongoDBUrl);
      }
      await AdvertiserModel.deleteMany({});
      return new TestAdvertiserMongoDBRepo();
    }
  
    static async disconnect(): Promise<void> {
      await mongoose.disconnect();
    }
}