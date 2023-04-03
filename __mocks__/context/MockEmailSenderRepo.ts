import { IEmailSenderRepo } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IEmailSenderRepo";

export const mockedEmailSenderRepo = (): IEmailSenderRepo => {
  return {
    login: jest.fn(),
    signUp:jest.fn(),
    updateEmail: jest.fn(),
  };
};
