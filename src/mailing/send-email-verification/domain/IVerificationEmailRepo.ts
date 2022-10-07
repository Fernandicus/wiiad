import { IVerificationEmailTimerPrimitives } from "./VerificationEmailTimer";

export interface IVerificationEmailRepo {
  save(model: IVerificationEmailTimerPrimitives): Promise<void>;
  findById(id: string): Promise<IVerificationEmailTimerPrimitives | null>;
  remove(id: string): Promise<void>;
}