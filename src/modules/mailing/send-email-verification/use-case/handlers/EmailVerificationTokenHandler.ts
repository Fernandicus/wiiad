import { Email } from "@/src/common/domain/Email";
import { VerificationEmail } from "../../domain/VerificationEmail";
import { ExpirationDate } from "../../domain/value-objects/ExpirationDate";
import { SaveVerificationEmail } from "../SaveVerificationEmail";
import { Role } from "@/src/common/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { AuthToken } from "../../domain/value-objects/AuthToken";

interface ISaveEmailParams{
  id: string;
  email: string;
  role: string;
  authToken: string;
}

export class EmailVerificationTokenHandler {
  constructor(private saveEmailVerfication: SaveVerificationEmail) {}

  async saveWithExpirationIn5min(props: ISaveEmailParams): Promise<void> {
    const verificationEmail = new VerificationEmail({
      id: new UniqId(props.id),
      expirationDate: ExpirationDate.inFiveMinutes(),
      email: new Email(props.email),
      role: new Role(props.role),
      authToken: new AuthToken(props.authToken),
    });
    this.saveEmailVerfication.save(verificationEmail);
  }
}
