import { Email } from "@/src/domain/Email";
import {
  VerificationEmailTimer,
  IVerificationEmailTimerProps,
  IVerificationEmailTimerPrimitives,
} from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { ExpirationDate } from "@/src/modules/mailing/send-email-verification/domain/ExpirationDate";
import { EmailVerificationConstants } from "@/src/modules/mailing/send-email-verification/EmailVerificationConstants";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";
import { Rol, RolType } from "@/src/domain/Rol";

export class FakeVerificationEmailTimer extends VerificationEmailTimer {
  constructor({
    id,
    expirationDate,
    email,
    rol,
  }: IVerificationEmailTimerProps) {
    super({ id, expirationDate, email, rol });
  }

  static create(roltype = RolType.BUSINESS): FakeVerificationEmailTimer {
    const { email, expirationDate, id, rol } = this.generateRandomData(roltype);
    return new FakeVerificationEmailTimer({
      id: new UniqId(id),
      email: new Email(email),
      expirationDate: new ExpirationDate(expirationDate),
      rol: new Rol(rol),
    });
  }

  static createWithPrimitives({
    roltype = RolType.BUSINESS,
    hasExpired = false
  }): IVerificationEmailTimerPrimitives {
    const { email, expirationDate, id, rol } = this.generateRandomData(roltype);
    if (!hasExpired) {
      return {
        id,
        email,
        expirationDate,
        rol,
      };
    } else {
      const expiredDate = new Date(
        expirationDate.getTime() - EmailVerificationConstants.twentyFourH
      );
      return {
        id,
        email,
        expirationDate: expiredDate,
        rol,
      };
    }
  }

  static createManyWithPrimitives(
    amount = 5,
    roltype = RolType.BUSINESS
  ): IVerificationEmailTimerPrimitives[] {
    const vertificationEmailsPrimitives = this.generateMany(amount, roltype);
    return vertificationEmailsPrimitives;
  }

  static createMany(
    amount = 5,
    roltype = RolType.BUSINESS
  ): FakeVerificationEmailTimer[] {
    const vertificationEmailsPrimitives = this.generateMany(amount, roltype);
    const vertificationEmails = vertificationEmailsPrimitives.map(
      (verificationEmail): FakeVerificationEmailTimer => {
        return {
          id: new UniqId(verificationEmail.id),
          email: new Email(verificationEmail.email),
          expirationDate: new ExpirationDate(verificationEmail.expirationDate),
          rol: new Rol(verificationEmail.rol),
        };
      }
    );
    return vertificationEmails;
  }

  private static generateRandomData(
    rol: RolType
  ): IVerificationEmailTimerPrimitives {
    const email = faker.internet.email();
    const in5min = new Date(Date.now() + EmailVerificationConstants.fiveMin);
    const in24Hours = new Date(
      Date.now() + EmailVerificationConstants.twentyFourH
    );
    const expirationDate = faker.date.between(in5min, in24Hours);
    const id = UniqId.generate();
    return { email, id, expirationDate, rol };
  }

  private static generateMany(
    amount: number,
    rol: RolType
  ): IVerificationEmailTimerPrimitives[] {
    let verificationEmails: IVerificationEmailTimerPrimitives[] = [];
    for (var i = 0; i <= amount - 1; i++) {
      verificationEmails.push(this.generateRandomData(rol));
    }
    return verificationEmails;
  }
}
