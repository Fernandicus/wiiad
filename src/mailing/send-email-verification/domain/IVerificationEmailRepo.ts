import { VerificationEmailPropsPrimitives } from "./VerificationEmail";

export interface IVerificationEmailRepo {
  save(model: VerificationEmailPropsPrimitives): Promise<void>;
  findById(id: string): Promise<VerificationEmailPropsPrimitives | null>;
  remove(id: string): Promise<void>;
}
