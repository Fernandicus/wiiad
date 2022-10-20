import { Email } from "@/src/domain/Email";
import { VerificationEmailTimer } from "../domain/VerificationEmailTimer";
import { ExpirationDate } from "../domain/ExpirationDate";
import { SaveEmailVerification } from "../use-case/SaveEmailVerification";
import { Rol } from "@/src/domain/Rol";
import { UniqId } from "@/src/utils/UniqId";

export class EmailVerificationTokenHandler {
  constructor(private saveEmailVerfication: SaveEmailVerification) {}

  async saveWithExpirationIn5min(props: {
    id: string;
    email: string;
    rol: string;
  }): Promise<void> {
    const verificationEmailTimer = new VerificationEmailTimer({
      id: new UniqId(props.id),
      expirationDate: ExpirationDate.inFiveMinutes(),
      email: new Email(props.email),
      rol: new Rol(props.rol),
    });
    this.saveEmailVerfication.save(verificationEmailTimer);
  }
}
