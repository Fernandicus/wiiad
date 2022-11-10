import { RoleType } from "@/src/domain/Role";
import { AuthToken } from "@/src/modules/mailing/send-email-verification/domain/AuthToken";
import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { UniqId } from "@/src/utils/UniqId";
import { FakeVerificationEmail } from "../lib/modules/send-email-verification/FakeVerificationEmail";

export const mockedVerificationEmailRepo = (emails: {
  valid: VerificationEmail;
  expired: VerificationEmail;
}) : IVerificationEmailRepo => {
  const business = FakeVerificationEmail.createMany(3, RoleType.BUSINESS);
  const user = FakeVerificationEmail.createMany(2, RoleType.USER);
  const verificationEmails = [
    ...business,
    ...user,
    emails.valid,
    emails.expired,
  ];

  return {
    findByAuthToken: jest.fn().mockImplementation((tokenId: AuthToken) : VerificationEmail | null=> {
      const emailFound = verificationEmails.find(
        (email) => email.authToken.token == tokenId.token
      );
      if (!emailFound) return null;
      return emailFound;
    }),
    removeById: jest.fn(),
    save: jest.fn(),
  };
};
