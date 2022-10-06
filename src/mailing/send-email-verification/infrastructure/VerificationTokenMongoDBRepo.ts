import { IVerificationURLRepo } from "../domain/IVerificationURLRepo";
import { VerificationURLPropsPrimitives } from "../domain/VerificationURL";
import { VerificationEmailModel } from "./VerificationEmailModel";

export class VerificationTokenMongoDBRepo implements IVerificationURLRepo {
  async save(model: VerificationURLPropsPrimitives): Promise<void> {
    const verificationToken = new VerificationEmailModel({
      _id: model.id,
      ...model,
    });
    await verificationToken.save();
  }

  findById(id: string): Promise<VerificationURLPropsPrimitives | null> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
