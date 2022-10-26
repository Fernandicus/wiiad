import { RolType } from "@/src/domain/Rol";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { TestVerificationEmailRepo } from "../../__mocks__/lib/modules/send-email-verification/domain/TestVerificationEmailRepo";
import { FakeVerificationEmailTimer } from "../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../__mocks__/lib/modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";

export const mockedVerificationEmailRepo = async (
  expiredAmount: number,
  validAmount: number
): Promise<MockVerificationEmailDB> => {
  const verificationEmailRepo = await TestVerificationEmailMongoDBRepo.init();
  return MockVerificationEmailDB.setAndInit(
    verificationEmailRepo,
    expiredAmount,
    validAmount
  );
};

export class MockVerificationEmailDB {
  readonly verificationEmailRepo;

  private constructor(verificationEmailRepo: TestVerificationEmailRepo) {
    this.verificationEmailRepo = verificationEmailRepo;
  }

  static async setAndInit(
    verificationEmailRepo: TestVerificationEmailRepo,
    expiredAmount: number,
    validAmount: number
  ): Promise<MockVerificationEmailDB> {
    const { expired, valids } = this.setEmailVerification(
      expiredAmount,
      validAmount
    );
    await verificationEmailRepo.saveMany([...expired, ...valids]);
    return new MockVerificationEmailDB(verificationEmailRepo);
  }

  async saveMany(
    verificationEmailPrimitives: IVerificationEmailTimerPrimitives[]
  ): Promise<void> {
    await this.verificationEmailRepo.saveMany(verificationEmailPrimitives);
  }

  async getAll(): Promise<{
    expired: IVerificationEmailTimerPrimitives[];
    valid: IVerificationEmailTimerPrimitives[];
  } | null> {
    const emailsFound = await this.verificationEmailRepo.getAll();
    if (!emailsFound) return null;

    const filteredEmails = this.getExpiredAndValidEmails(emailsFound);

    return filteredEmails;
  }

  private static setEmailVerification(
    expiredAmount: number,
    validAmount: number
  ): {
    expired: IVerificationEmailTimerPrimitives[];
    valids: IVerificationEmailTimerPrimitives[];
  } {
    const expiredEmails = FakeVerificationEmailTimer.createManyWithPrimitives(
      expiredAmount,
      RolType.BUSINESS,
      true
    );
    const validEmails = FakeVerificationEmailTimer.createManyWithPrimitives(
      validAmount,
      RolType.BUSINESS,
      false
    );
    return {
      expired: expiredEmails,
      valids: validEmails,
    };
  }

  private getExpiredAndValidEmails(
    emails: IVerificationEmailTimerPrimitives[]
  ): {
    expired: IVerificationEmailTimerPrimitives[];
    valid: IVerificationEmailTimerPrimitives[];
  } {
    const now = new Date(Date.now());

    const expiredMails = emails.filter(
      (email) => email.expirationDate.getTime() < now.getTime()
    );
    const validMails = emails.filter(
      (email) => email.expirationDate.getTime() > now.getTime()
    );

    return {
      expired: expiredMails,
      valid: validMails,
    };
  }
}
