import { Email } from "@/src/domain/Email";
import {
  VerificationEmailTimer,
  IVerificationEmailTimerProps,
  IVerificationEmailTimerPrimitives,
} from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { ExpirationDate } from "@/src/modules/mailing/send-email-verification/domain/ExpirationDate";
import { TimerConstants } from "@/src/modules/mailing/send-email-verification/domain/TimerConstants";
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

  static create(
    roletype = RoleType.BUSINESS,
    hasExpired = false
  ): VerificationEmailTimer {
    const { email, expirationDate, id, role } =
      this.generateRandomData(roletype);

    const expiration = hasExpired
      ? this.expiredDate(expirationDate)
      : expirationDate;

    return new FakeVerificationEmailTimer({
      id: new UniqId(id),
      email: new Email(email),
      expirationDate: new ExpirationDate(expiration),
      role: new Role(role),
    });
  }

  static createWithPrimitives({
    roletype = RoleType.BUSINESS,
    hasExpired = false,
  }): IVerificationEmailTimerPrimitives {
    const { email, expirationDate, id, role } =
      this.generateRandomData(roletype);

    const expiration = hasExpired
      ? this.expiredDate(expirationDate)
      : expirationDate;

    return {
      id,
      email,
      expirationDate: expiration,
      role,
    };
  }

  static createManyWithPrimitives(
    amount = 5,
    roletype = RoleType.BUSINESS,
    hasExpired = false
  ): IVerificationEmailTimerPrimitives[] {
    let vertificationEmailsPrimitives: IVerificationEmailTimerPrimitives[] = [];

    for (let i = 0; i < amount - 1; i++) {
      vertificationEmailsPrimitives.push(
        this.createWithPrimitives({ roletype, hasExpired })
      );
    }
    return vertificationEmailsPrimitives;
  }

  static createMany(
    amount = 5,
    roletype = RoleType.BUSINESS,
    hasExpired = false
  ): VerificationEmailTimer[] {
    let verificationEmail: VerificationEmailTimer[] = [];

    for (let i = 0; i < amount; i++) {
      verificationEmail.push(this.create(roletype, hasExpired));
    }

    return verificationEmail;
  }

  private static generateRandomData(
    role: RoleType
  ): IVerificationEmailTimerPrimitives {
    const email = faker.internet.email();
    const in5min = new Date(Date.now() + TimerConstants.fiveMin);
    const in24Hours = new Date(Date.now() + TimerConstants.twentyFourH);
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

  private static expiredDate(expirationDate: Date): Date {
    return new Date(expirationDate.getTime() - TimerConstants.twentyFourH);
  }
}
