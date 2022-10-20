import { Email } from "@/src/domain/Email";
import { Rol } from "@/src/domain/Rol";
import { UniqId } from "@/src/utils/UniqId";
import { ExpirationDate } from "./ExpirationDate";

export interface IVerificationEmailTimerPrimitives {
  email: string;
  id: string;
  expirationDate: Date;
  rol: string;
}

export interface IVerificationEmailTimerProps {
  id: UniqId;
  expirationDate: ExpirationDate;
  email: Email;
  rol: Rol;
}

export class VerificationEmailTimer {
  readonly id;
  readonly expirationDate;
  readonly email;
  readonly rol;

  constructor(props: IVerificationEmailTimerProps) {
    this.id = props.id;
    this.expirationDate = props.expirationDate;
    this.email = props.email;
    this.rol = props.rol;
  }

}
