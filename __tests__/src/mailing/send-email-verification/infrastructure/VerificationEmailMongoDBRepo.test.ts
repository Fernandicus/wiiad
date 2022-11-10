import { FakeVerificationEmail } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmail";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { VerificationEmailMongoDBRepo } from "@/src/modules/mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";
import { setTestVerificationEmailDB } from "../../../../../__mocks__/lib/infrastructure/db/TestVerificationEmailDB";
import { UniqId } from "@/src/utils/UniqId";

describe("On VerificationEmailMongoDBRepo, GIVEN some verification emails in MongoDB", () => {
  let validEmails: VerificationEmail[];
  let repo: VerificationEmailMongoDBRepo;

  beforeAll(async () => {
    const testVerificationEmailDB = await setTestVerificationEmailDB(2, 2);
    const emails = await testVerificationEmailDB.getAll();
    validEmails = emails!.valid;
    repo = new VerificationEmailMongoDBRepo();
  });

  it(`WHEN call the save method, 
  THEN the verificationEmail should be saved and found in MongoDB`, async () => {
    const verificationEmail = FakeVerificationEmail.create();
    await repo.save(verificationEmail);
    const verificationEmailFound = await repo.findByAuthToken(verificationEmail.authToken);
    expect(verificationEmailFound).toEqual(verificationEmail);
  });

  it(`WHEN call the remove method for an ID, 
  THEN the verification email should be removed from MongoDB`, async () => {
    const verificationEmailFound = await repo.findByAuthToken(
      validEmails[0].authToken
    );

    await repo.removeById(verificationEmailFound!.id);

    const notVerificationEmailFound = await repo.findByAuthToken(
      validEmails[0].authToken
    );

    expect(notVerificationEmailFound).toBe(null);
  });
});
