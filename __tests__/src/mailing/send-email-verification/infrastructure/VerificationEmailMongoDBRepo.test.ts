import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmailTimer";
import { VerificationEmailTimer } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { VerificationEmailMongoDBRepo } from "@/src/modules/mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";
import { setTestVerificationEmailDB } from "../../../../../__mocks__/lib/infrastructure/db/TestVerificationEmailDB";
import { UniqId } from "@/src/utils/UniqId";

describe("On VerificationEmailMongoDBRepo, GIVEN some verification emails in MongoDB", () => {
  let validEmails: VerificationEmailTimer[];
  let repo: VerificationEmailMongoDBRepo;

  beforeAll(async () => {
    const testVerificationEmailDB = await setTestVerificationEmailDB(2, 2);
    const emails = await testVerificationEmailDB.getAll();
    validEmails = emails!.valid;
    repo = new VerificationEmailMongoDBRepo();
  });

  it(`WHEN call the save method, 
  THEN the verificationEmail should be saved and found in MongoDB`, async () => {
    const verificationEmail = FakeVerificationEmailTimer.create();
    await repo.save(verificationEmail);
    const verificationEmailFound = await repo.findByAuthToken(verificationEmail.id);
    expect(verificationEmailFound).toEqual(verificationEmail);
  });

  it(`WHEN call the remove method for an ID, 
  THEN the verification email should be removed from MongoDB`, async () => {
    const verificationEmailFound = await repo.findByAuthToken(
      validEmails[0].id
    );

    await repo.remove(verificationEmailFound!.id);

    const notVerificationEmailFound = await repo.findByAuthToken(
      validEmails[0].id
    );

    expect(notVerificationEmailFound).toBe(null);
  });
});
