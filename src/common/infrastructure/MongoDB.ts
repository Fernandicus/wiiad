import mongoose from "mongoose";

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

  static async connectAndDisconnect<T>(cb: ()=>Promise<T>): Promise<T> {
    await this.connect();
    const response = await cb();
    await this.disconnect();
    return response;
  }
}
