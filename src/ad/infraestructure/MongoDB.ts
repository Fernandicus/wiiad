import mongoose from "mongoose";
import { AdMongoDBRepository } from "./AdMongoDBRepository";

export class MongoDB {
  private static async connect() {
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

  static async adRepository(): Promise<AdMongoDBRepository> {
    await this.connect();
    return new AdMongoDBRepository();
  }
}
