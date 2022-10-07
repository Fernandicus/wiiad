import { IVerificationEmailPropsPrimitives } from "../domain/IVerificationEmailPropsPrimitives";
import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { VerificationEmailModel } from "./VerificationEmailModel";

export class VerificationEmailMongoDBRepo implements IVerificationEmailRepo {
  async save(model: IVerificationEmailPropsPrimitives): Promise<void> {
    const verificationEmail = new VerificationEmailModel({
      _id: model.id,
      ...model,
    });
    await verificationEmail.save();
  }

  async findById(
    id: string
  ): Promise<IVerificationEmailPropsPrimitives | null> {
    const model = await VerificationEmailModel.findById(id);
    if (!model) return null;
    return {
      id: model._id,
      email: model.email,
      expirationDate: model.expirationDate,
    };
  }

  async remove(id: string): Promise<void> {
    await VerificationEmailModel.findByIdAndDelete(id);
  }
}
