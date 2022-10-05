import { VerificationTokenModelProps } from "../infrastructure/VerificationTokenModel";

export interface IVerificationTokenRepo {
  save(model: VerificationTokenModelProps): Promise<void>;
  findById(id: string): Promise<VerificationTokenModelProps | null>;
  remove(id: string): Promise<void>;
}
