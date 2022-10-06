import { VerificationURL, IVerificationEmailPropsPrimitives } from "./VerificationURL";

export interface IVerificationEmailRepo {
  save(model: IVerificationEmailPropsPrimitives): Promise<void>;
  findById(id: string): Promise<IVerificationEmailPropsPrimitives | null>;
  remove(id: string): Promise<void>;
}
