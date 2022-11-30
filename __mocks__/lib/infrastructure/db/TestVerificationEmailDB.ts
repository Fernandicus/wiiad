import { RoleType } from "@/src/common/domain/Role";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { User } from "@/src/modules/users/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { TestVerificationEmailRepo } from "../../modules/send-email-verification/domain/TestVerificationEmailRepo";
import { FakeVerificationEmail } from "../../modules/send-email-verification/FakeVerificationEmail";
import { TestVerificationEmailMongoDBRepo } from "../../modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";

export const autoSetTestVerificationEmailDB = async (
  expiredAmount: number,
  validAmount: number
): Promise<TestVerificationEmailDB> => {
  const verificationEmailRepo = await TestVerificationEmailMongoDBRepo.init();
  return TestVerificationEmailDB.setAndInit(
    verificationEmailRepo,
    expiredAmount,
    validAmount
  );
};

export const setTestVerificationEmailDB = async (params: {
  expired: User[];
  valid:  User[];
}): Promise<TestVerificationEmailDB> => {
  const { expired, valid } = params;
  const verificationEmailRepo = await TestVerificationEmailMongoDBRepo.init();
  return TestVerificationEmailDB.givenUsers({
    verificationEmailRepo,
    validUsers: valid,
    expiredUsers: expired,
  });
};

export class TestVerificationEmailDB {
  readonly verificationEmailRepo;

  private constructor(verificationEmailRepo: TestVerificationEmailRepo) {
    this.verificationEmailRepo = verificationEmailRepo;
  }

  static async givenUsers(params: {
    verificationEmailRepo: TestVerificationEmailRepo;
    validUsers:  User[];
    expiredUsers:  User[];
  }): Promise<TestVerificationEmailDB> {
    const { expiredUsers, validUsers, verificationEmailRepo } = params;
    const validEmails = FakeVerificationEmail.createManyGivenUsers(
      validUsers,
      false
    );
    const expiredEmails = FakeVerificationEmail.createManyGivenUsers(
      expiredUsers,
      true
    );
    
    await verificationEmailRepo.saveMany([...validEmails, ...expiredEmails]);
    return new TestVerificationEmailDB(verificationEmailRepo);
  }

  static async setAndInit(
    verificationEmailRepo: TestVerificationEmailRepo,
    expiredAmount: number,
    validAmount: number
  ): Promise<TestVerificationEmailDB> {
    const { expired, valids } = this.setEmailVerification(
      expiredAmount,
      validAmount
    );
    await verificationEmailRepo.saveMany([...expired, ...valids]);
    return new TestVerificationEmailDB(verificationEmailRepo);
  }

  async saveMany(verificationEmail: VerificationEmail[]): Promise<void> {
    await this.verificationEmailRepo.saveMany(verificationEmail);
  }

  async getAll(): Promise<{
    expired: VerificationEmail[];
    valid: VerificationEmail[];
  } | null> {
    const emailsFound = await this.verificationEmailRepo.getAll();
  
    if (!emailsFound) return null;

    const filteredEmails = this.getExpiredAndValidEmails(emailsFound);

    return filteredEmails;
  }

  async findById(id: UniqId): Promise<VerificationEmail | null> {
    const emailFound = await this.verificationEmailRepo.findById(id);
    return emailFound;
  }

  private static setEmailVerification(
    expiredAmount: number,
    validAmount: number
  ): {
    expired: VerificationEmail[];
    valids: VerificationEmail[];
  } {
    const expiredEmails = FakeVerificationEmail.createMany(
      expiredAmount,
      RoleType.BUSINESS,
      true
    );
    const validEmails = FakeVerificationEmail.createMany(
      validAmount,
      RoleType.BUSINESS
    );
    return {
      expired: expiredEmails,
      valids: validEmails,
    };
  }

  private getExpiredAndValidEmails(emails: VerificationEmail[]): {
    expired: VerificationEmail[];
    valid: VerificationEmail[];
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
