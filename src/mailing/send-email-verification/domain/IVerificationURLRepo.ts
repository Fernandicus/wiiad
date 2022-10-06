import { VerificationURL, VerificationURLPropsPrimitives } from "./VerificationURL";

export interface IVerificationURLRepo {
  save(model: VerificationURLPropsPrimitives): Promise<void>;
  findById(id: string): Promise<VerificationURLPropsPrimitives | null>;
  remove(id: string): Promise<void>;
}
