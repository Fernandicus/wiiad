import { UniqId } from "@/src/utils/UniqId";
import { VerificationEmailTimer } from "./VerificationEmailTimer";

export interface IVerificationEmailRepo {
  save(model: VerificationEmailTimer): Promise<void>;
  findById(id: UniqId): Promise<VerificationEmailTimer | null>;
  remove(id: UniqId): Promise<void>;
}