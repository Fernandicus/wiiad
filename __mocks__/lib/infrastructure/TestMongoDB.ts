import mongoose from "mongoose";
const { Model } = mongoose;

export class TestMongoDB {
  static async connectAndCleanModel<M extends typeof Model>(
    model: M
  ): Promise<void> {
    const mongoIsDisonnected =
      mongoose.connection.readyState === mongoose.ConnectionStates.disconnected;

    if (mongoIsDisonnected) {
      const mongoDBUrl = process.env.MONGODB_URL;
      if (!mongoDBUrl) throw new Error("DB url doesn't provided");
      await mongoose.connect(mongoDBUrl);
    }
    await model.deleteMany({});
  }

  static async disconnectMongoDB(): Promise<void> {
    await mongoose.disconnect();
  }
}
