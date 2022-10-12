import { AdvertiserMongoDBRepo } from "@/src/advertiser/infraestructure/AdvertiserMongoDBRepo";
import mongoose from "mongoose";
import { AdMongoDBRepository } from "../ad/infraestructure/AdMongoDBRepository";
import { VerificationEmailMongoDBRepo } from "../mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";

export class MongoDB {
  static async connect() {
    const mongoIsDisonnected =
      mongoose.connection.readyState === mongoose.ConnectionStates.disconnected;

    if (mongoIsDisonnected) {
      const mongoDBUrl = process.env.MONGODB_URL;
      if (!mongoDBUrl) throw new Error("DB url doesn't provided");
      await mongoose.connect(mongoDBUrl);
    }
  }

  static async disconnect() {
    const mongoIsConnected =
      mongoose.connection.readyState === mongoose.ConnectionStates.connected;

    if (mongoIsConnected) {
      await mongoose.disconnect();
    }
  }

  static async verificationEmailRepo(): Promise<VerificationEmailMongoDBRepo> {
    await this.connect();
    return new VerificationEmailMongoDBRepo();
  }

  static async adRepository(): Promise<AdMongoDBRepository> {
    await this.connect();
    return new AdMongoDBRepository();
  }

  static async advertiserRepo(): Promise<AdvertiserMongoDBRepo> {
    await this.connect();
    return new AdvertiserMongoDBRepo();
  }

  static async connectAndDisconnect<T>(cb: ()=>Promise<T>): Promise<T> {
    await this.connect();
    const response = await cb();
    await this.disconnect();
    return response;
  }
}
