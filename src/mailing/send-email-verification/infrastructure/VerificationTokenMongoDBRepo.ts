import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { VerificationEmailPropsPrimitives } from "../domain/VerificationEmail";
import { VerificationEmailModel } from "./VerificationEmailModel";

export class VerificationTokenMongoDBRepo implements IVerificationEmailRepo {
  async save(model: VerificationEmailPropsPrimitives): Promise<void> {
    const verificationToken = new VerificationEmailModel({
      _id: model.id,
      ...model,
    });
    await verificationToken.save();
  }

  findById(id: string): Promise<VerificationEmailPropsPrimitives | null> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
