import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { IVerificationEmailPropsPrimitives } from "../domain/VerificationURL";
import { VerificationEmailModel } from "./VerificationEmailModel";

export class VerificationEmailMongoDBRepo implements IVerificationEmailRepo {
  async save(model: IVerificationEmailPropsPrimitives): Promise<void> {
    const verificationEmail = new VerificationEmailModel({
      _id: model.id,
      ...model,
    });
    await verificationEmail.save();
  }

  findById(id: string): Promise<IVerificationEmailPropsPrimitives | null> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
