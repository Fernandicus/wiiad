import { Email } from "@/src/domain/Email";
import { IEmailVerificationProps } from "@/src/mailing/send-email-verification/domain/EmailVerification";
import { ExpirationDate } from "@/src/mailing/send-email-verification/domain/ExpirationDate";
import { VerificationTokenId } from "@/src/mailing/send-email-verification/domain/VerificationTokenId";
import { EmailVerificationConstants } from "@/src/mailing/send-email-verification/EmailVerificationConstants";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";

export class FakeEmailVerification {
  readonly id;
  readonly expirationDate;
  readonly email;
  constructor({ id, expirationDate, email }: IEmailVerificationProps) {
    this.email = email;
    this.expirationDate = expirationDate;
    this.id = id;
  }

  static create(): FakeEmailVerification {
    const { email, expirationDate, id } = this.generateRandomData();
    return new FakeEmailVerification({
      id: new VerificationTokenId(id),
      email: new Email(email),
      expirationDate: new ExpirationDate(expirationDate),
    });
  }

  private static generateRandomData(): {
    email: string;
    id: string;
    expirationDate: Date;
  } {
    const email = faker.internet.email();
    const in5min = new Date(Date.now() + EmailVerificationConstants.fiveMin);
    const in24Hours = new Date(
      Date.now() + EmailVerificationConstants.twentyFourH
    );
    const expirationDate = faker.date.between(in5min, in24Hours);
    const id = UniqId.generate();

    return { email, id, expirationDate };
  }
}
