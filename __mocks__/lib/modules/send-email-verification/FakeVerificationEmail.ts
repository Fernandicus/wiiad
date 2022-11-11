import { Email } from "@/src/domain/Email";
import {
  VerificationEmail,
  IVerificationEmailProps,
  IVerificationEmailPrimitives,
} from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { ExpirationDate } from "@/src/modules/mailing/send-email-verification/domain/ExpirationDate";
import { TimerConstants } from "@/src/modules/mailing/send-email-verification/domain/TimerConstants";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";
import { Role, RoleType } from "@/src/domain/Role";
import { authTokenCreator } from "@/src/modules/mailing/send-email-verification/email-verification-container";
import { User } from "@/src/modules/user/domain/User";
import { AuthToken } from "@/src/modules/mailing/send-email-verification/domain/AuthToken";
import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";

export class FakeVerificationEmail extends VerificationEmail {
  constructor(params: IVerificationEmailProps) {
    super(params);
  }

  static createGivenUser(
    user: User | Advertiser,
    hasExpired = false
  ): VerificationEmail {
    const expirationDate = ExpirationDate.inFiveMinutes().date;
    const expiration = hasExpired
      ? this.expiredDate(expirationDate)
      : expirationDate;
    const authToken = authTokenCreator.generate();
    return new VerificationEmail({
      id: new UniqId(user.id.id),
      email: new Email(user.email.email),
      expirationDate: new ExpirationDate(expiration),
      role: new Role(user.role.role),
      authToken: new AuthToken(authToken.token),
    });
  }

  static createManyGivenUsers(
    users: User[] | Advertiser[],
    hasExpired = false
  ): VerificationEmail[] {
    const verificationEmails = users.map((user) =>
      this.createGivenUser(user, hasExpired)
    );
    return verificationEmails;
  }

  static create(
    roletype = RoleType.BUSINESS,
    hasExpired = false
  ): VerificationEmail {
    const { email, expirationDate, id, role } =
      this.generateRandomData(roletype);

    const expiration = hasExpired
      ? this.expiredDate(expirationDate)
      : expirationDate;

    const authToken = authTokenCreator.generate();

    return new FakeVerificationEmail({
      id: new UniqId(id),
      email: new Email(email),
      expirationDate: new ExpirationDate(expiration),
      role: new Role(role),
      authToken,
    });
  }

  static createWithPrimitives({
    roletype = RoleType.BUSINESS,
    hasExpired = false,
  }): IVerificationEmailPrimitives {
    const { email, expirationDate, id, role } =
      this.generateRandomData(roletype);

    const expiration = hasExpired
      ? this.expiredDate(expirationDate)
      : expirationDate;

    const authToken = authTokenCreator.generate().token;

    return {
      id,
      email,
      expirationDate: expiration,
      role,
      authToken,
    };
  }

  static createManyWithPrimitives(
    amount = 5,
    roletype = RoleType.BUSINESS,
    hasExpired = false
  ): IVerificationEmailPrimitives[] {
    let vertificationEmailsPrimitives: IVerificationEmailPrimitives[] = [];

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
  ): VerificationEmail[] {
    let verificationEmail: VerificationEmail[] = [];

    for (let i = 0; i < amount; i++) {
      verificationEmail.push(this.create(roletype, hasExpired));
    }

    return verificationEmail;
  }

  private static generateRandomData(
    role: RoleType
  ): IVerificationEmailPrimitives {
    const email = faker.internet.email();
    const in5min = new Date(Date.now() + TimerConstants.fiveMin);
    const in24Hours = new Date(Date.now() + TimerConstants.twentyFourH);
    const expirationDate = faker.date.between(in5min, in24Hours);
    const id = UniqId.generate();
    const authToken = authTokenCreator.generate().token;
    return { email, id, expirationDate, role, authToken };
  }

  private static generateMany(
    amount: number,
    role: RoleType
  ): IVerificationEmailPrimitives[] {
    let verificationEmails: IVerificationEmailPrimitives[] = [];
    for (var i = 0; i <= amount - 1; i++) {
      verificationEmails.push(this.generateRandomData(role));
    }
    return verificationEmails;
  }

  private static expiredDate(expirationDate: Date): Date {
    return new Date(expirationDate.getTime() - TimerConstants.twentyFourH);
  }
}
