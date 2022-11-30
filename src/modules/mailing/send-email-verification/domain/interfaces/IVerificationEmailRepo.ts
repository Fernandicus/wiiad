import { UniqId } from "@/src/utils/UniqId";
import { AuthToken } from "../value-objects/AuthToken";
import { VerificationEmail } from "../VerificationEmail";

export interface IVerificationEmailRepo {
  save(verificationEmail: VerificationEmail): Promise<void>;
  findByAuthToken(token: AuthToken): Promise<VerificationEmail | null>;
  removeById(id: UniqId): Promise<void>;
}