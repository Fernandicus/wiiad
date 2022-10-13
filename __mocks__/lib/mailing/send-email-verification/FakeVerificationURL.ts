import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { VerificationTokenId } from "@/src/modules/mailing/send-email-verification/domain/VerificationTokenId";
import {
  IVerificationURLProps,
  VerificationURL,
} from "@/src/modules/mailing/send-email-verification/domain/VerificationURL";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";

export class FakeVerificationURL extends VerificationURL {
  constructor(props: IVerificationURLProps) {
    super(props);
  }

  static create(): FakeVerificationURL {
    const to = new Email(faker.internet.email());
    const token = new VerificationTokenId(UniqId.generate());
    const userName = new Name(faker.name.firstName());

    return new FakeVerificationURL({ to, token, userName });
  }
}
