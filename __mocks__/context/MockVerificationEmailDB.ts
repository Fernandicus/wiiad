import { RoleType } from "@/src/domain/Role";
import {
  IVerificationEmailTimerPrimitives,
  VerificationEmailTimer,
} from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { UniqId } from "@/src/utils/UniqId";
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

  async saveMany(verificationEmail: VerificationEmailTimer[]): Promise<void> {
    await this.verificationEmailRepo.saveMany(verificationEmail);
  }

  async getAll(): Promise<{
    expired: VerificationEmailTimer[];
    valid: VerificationEmailTimer[];
  } | null> {
    const emailsFound = await this.verificationEmailRepo.getAll();
    if (!emailsFound) return null;

    const filteredEmails = this.getExpiredAndValidEmails(emailsFound);

    return filteredEmails;
  }

  async findById(id: UniqId): Promise<VerificationEmailTimer | null> {
    const emailFound = await this.verificationEmailRepo.findById(id);
    console.log(emailFound?.id);
    return emailFound;
  }

  private static setEmailVerification(
    expiredAmount: number,
    validAmount: number
  ): {
    expired: VerificationEmailTimer[];
    valids: VerificationEmailTimer[];
  } {
    const expiredEmails = FakeVerificationEmailTimer.createMany(
      expiredAmount,
      RoleType.BUSINESS,
      true
    );
    const validEmails = FakeVerificationEmailTimer.createMany(
      validAmount,
      RoleType.BUSINESS
    );
    return {
      expired: expiredEmails,
      valids: validEmails,
    };
  }

  private getExpiredAndValidEmails(emails: VerificationEmailTimer[]): {
    expired: VerificationEmailTimer[];
    valid: VerificationEmailTimer[];
  } {
    const now = new Date(Date.now());

    const expiredMails = emails.filter(
      (email) => email.expirationDate.date.getTime() < now.getTime()
    );
    const validMails = emails.filter(
      (email) => email.expirationDate.date.getTime() > now.getTime()
    );

    return {
      expired: expiredMails,
      valid: validMails,
    };
  }
}
