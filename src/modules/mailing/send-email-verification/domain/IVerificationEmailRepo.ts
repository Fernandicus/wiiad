import { UniqId } from "@/src/utils/UniqId";
import { VerificationEmailTimer } from "./VerificationEmailTimer";

export interface IVerificationEmailRepo {
  save(model: VerificationEmailTimer): Promise<void>;
  findByAuthToken(token: string): Promise<VerificationEmailTimer | null>;
  removeById(id: string): Promise<void>;
}