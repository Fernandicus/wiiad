import { Email } from "@/src/domain/Email";
import {
  VerificationEmailTimer,
  IVerificationEmailTimerProps,
} from "@/src/mailing/send-email-verification/domain/VerificationEmailTimer";
import { ExpirationDate } from "@/src/mailing/send-email-verification/domain/ExpirationDate";
import { VerificationTokenId } from "@/src/mailing/send-email-verification/domain/VerificationTokenId";
import { EmailVerificationConstants } from "@/src/mailing/send-email-verification/EmailVerificationConstants";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";

interface FakeVerificationEmailTimerPrimitives {
  email: string;
  id: string;
  expirationDate: Date;
}

export class FakeVerificationEmailTimer extends VerificationEmailTimer {
  constructor({ id, expirationDate, email }: IVerificationEmailTimerProps) {
    super({ id, expirationDate, email });
  }

  static create(): FakeVerificationEmailTimer {
    const { email, expirationDate, id } = this.generateRandomData();
    return new FakeVerificationEmailTimer({
      id: new VerificationTokenId(id),
      email: new Email(email),
      expirationDate: new ExpirationDate(expirationDate),
    });
  }

  static createMany(amount = 5): FakeVerificationEmailTimer[] {
    const vertificationEmailsPrimitives = this.generateMany(amount);
    const vertificationEmails = vertificationEmailsPrimitives.map((verificationEmail):FakeVerificationEmailTimer=>{
      return {
        id: new VerificationTokenId(verificationEmail.id),
        email: new Email(verificationEmail.email),
        expirationDate: new ExpirationDate(verificationEmail.expirationDate),
      }
    })
    return vertificationEmails;
  }

  private static generateRandomData(): FakeVerificationEmailTimerPrimitives {
    const email = faker.internet.email();
    const in5min = new Date(Date.now() + EmailVerificationConstants.fiveMin);
    const in24Hours = new Date(
      Date.now() + EmailVerificationConstants.twentyFourH
    );
    const expirationDate = faker.date.between(in5min, in24Hours);
    const id = UniqId.generate();

    return { email, id, expirationDate };
  }

  private static generateMany(
    amount: number
  ): FakeVerificationEmailTimerPrimitives[] {
    let verificationEmails: FakeVerificationEmailTimerPrimitives[] = [];
    for (var i = 0; i <= amount - 1; i++) {
      verificationEmails.push(this.generateRandomData());
    }
    return verificationEmails;
  }
}
