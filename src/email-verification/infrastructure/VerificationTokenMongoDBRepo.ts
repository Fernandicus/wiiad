import { IVerificationTokenRepo } from "../domain/IVerificationTokenRepo";
import {
  VerificationTokenModel,
  VerificationTokenModelProps,
} from "./VerificationTokenModel";

export class VerificationTokenMongoDBRepo implements IVerificationTokenRepo {
  async save(model: VerificationTokenModelProps): Promise<void> {
    const verificationToken = new VerificationTokenModel(model);
    await verificationToken.save();
  }
  
  findById(id: string): Promise<VerificationTokenModelProps | null> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
