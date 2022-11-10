import { IEmailSenderRepo } from "@/src/modules/mailing/send-email-verification/domain/IEmailSenderRepo";

export const mockedEmailSenderRepo = (): IEmailSenderRepo => {
  return {
    send: jest.fn(),
  };
};
