import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
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

  static create(token:string): FakeVerificationURL {
    const to = new Email(faker.internet.email());
    const userName = new Name(faker.name.firstName());

    return new VerificationURL({ to, token, userName });
  }
}
