import { Email } from "@/src/common/domain/Email";
import { AuthToken } from "@/src/modules/mailing/send-email-verification/domain/value-objects/AuthToken";
import {
  IVerificationURLProps,
  VerificationURL,
} from "@/src/modules/mailing/send-email-verification/domain/VerificationURL";
import { UniqId } from "@/src/common/domain/UniqId";
import { faker } from "@faker-js/faker";

export class FakeVerificationURL extends VerificationURL {
  constructor(props: IVerificationURLProps) {
    super(props);
  }

  static create(authToken:AuthToken): FakeVerificationURL {
    const to = new Email(faker.internet.email());

    return new VerificationURL({ to, authToken });
  }
}
