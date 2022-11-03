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
import { Role, RoleType } from "@/src/domain/Role";

export class FakeVerificationEmailTimer extends VerificationEmailTimer {
  constructor({
    id,
    expirationDate,
    email,
    role,
  }: IVerificationEmailTimerProps) {
    super({ id, expirationDate, email, role });
  }

  static create(roletype = RoleType.BUSINESS): FakeVerificationEmailTimer {
    const { email, expirationDate, id, role } = this.generateRandomData(roletype);
    return new FakeVerificationEmailTimer({
      id: new UniqId(id),
      email: new Email(email),
      expirationDate: new ExpirationDate(expirationDate),
      role: new Role(role),
    });
  }

  static createWithPrimitives({
    roletype = RoleType.BUSINESS,
    hasExpired = false,
  }): IVerificationEmailTimerPrimitives {
    const { email, expirationDate, id, role } = this.generateRandomData(roletype);
    if (!hasExpired) {
      return {
        id,
        email,
        expirationDate,
        role,
      };
    } else {
      const expiredDate = new Date(
        expirationDate.getTime() - EmailVerificationConstants.twentyFourH
      );
      return {
        id,
        email,
        expirationDate: expiredDate,
        role,
      };
    }
  }

  static createManyWithPrimitives(
    amount = 5,
    roletype = RoleType.BUSINESS,
    hasExpired = false
  ): IVerificationEmailTimerPrimitives[] {
    let vertificationEmailsPrimitives: IVerificationEmailTimerPrimitives[] = [];
    for (let i = 0; i < amount -1; i++) {
      vertificationEmailsPrimitives.push(
        this.createWithPrimitives({ roletype, hasExpired })
      );
    }
    return vertificationEmailsPrimitives;
  }

  static createMany(
    amount = 5,
    roletype = RoleType.BUSINESS
  ): FakeVerificationEmailTimer[] {
    const vertificationEmailsPrimitives = this.generateMany(amount, roletype);
    const vertificationEmails = vertificationEmailsPrimitives.map(
      (verificationEmail): FakeVerificationEmailTimer => {
        return {
          id: new UniqId(verificationEmail.id),
          email: new Email(verificationEmail.email),
          expirationDate: new ExpirationDate(verificationEmail.expirationDate),
          role: new Role(verificationEmail.role),
        };
      }
    );
    return vertificationEmails;
  }

  private static generateRandomData(
    role: RoleType
  ): IVerificationEmailTimerPrimitives {
    const email = faker.internet.email();
    const in5min = new Date(Date.now() + EmailVerificationConstants.fiveMin);
    const in24Hours = new Date(
      Date.now() + EmailVerificationConstants.twentyFourH
    );
    const expirationDate = faker.date.between(in5min, in24Hours);
    const id = UniqId.generate();
    return { email, id, expirationDate, role };
  }

  private static generateMany(
    amount: number,
    role: RoleType
  ): IVerificationEmailTimerPrimitives[] {
    let verificationEmails: IVerificationEmailTimerPrimitives[] = [];
    for (var i = 0; i <= amount - 1; i++) {
      verificationEmails.push(this.generateRandomData(role));
    }
    return verificationEmails;
  }
}
