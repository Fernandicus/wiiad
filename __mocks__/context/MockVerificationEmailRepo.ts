import { RoleType } from "@/src/domain/Role";
import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { VerificationEmailTimer } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { UniqId } from "@/src/utils/UniqId";
import { FakeVerificationEmailTimer } from "../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmailTimer";

export const mockedVerificationEmailRepo = (emails: {
  valid: VerificationEmailTimer;
  expired: VerificationEmailTimer;
}) : IVerificationEmailRepo => {
  const business = FakeVerificationEmailTimer.createMany(3, RoleType.BUSINESS);
  const user = FakeVerificationEmailTimer.createMany(2, RoleType.USER);
  const verificationEmails = [
    ...business,
    ...user,
    emails.valid,
    emails.expired,
  ];

  return {
    findById: jest.fn().mockImplementation((tokenId: UniqId) : VerificationEmailTimer | null=> {
      const emailFound = verificationEmails.find(
        (email) => email.id.id == tokenId.id
      );
      if (!emailFound) return null;
      return emailFound;
    }),
    remove: jest.fn(),
    save: jest.fn(),
  };
};
