import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../../../../__mocks__/lib/modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { VerificationEmailMongoDBRepo } from "@/src/modules/mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";
import { RoleType } from "@/src/domain/Role";
import { mockedVerificationEmailRepo } from "../../../../../__mocks__/context/MockVerificationEmailDB";

describe("On VerificationEmailMongoDBRepo, GIVEN some verification emails in MongoDB", () => {
  let vertificationEmails: IVerificationEmailTimerPrimitives[];
  let verificationEmailMongoDBRepo: VerificationEmailMongoDBRepo;

  beforeAll(async () => {
    const mockedVerificationEmailsDB = await mockedVerificationEmailRepo(2, 2);
    const emails = await mockedVerificationEmailsDB.getAll();
    vertificationEmails = emails!.valid;
    verificationEmailMongoDBRepo = new VerificationEmailMongoDBRepo();
  });

  it(`WHEN call the save method, 
  THEN WHEN call the findById method the verification email should be found in MongoDB`, async () => {
    const verificationEmail = FakeVerificationEmailTimer.createWithPrimitives({
      roletype: RoleType.BUSINESS,
      hasExpired: false,
    });
    await verificationEmailMongoDBRepo.save(verificationEmail);
    const verificationEmailFound = await verificationEmailMongoDBRepo.findById(
      verificationEmail.id
    );

    expect(verificationEmailFound!.id).toBe(verificationEmail.id);
    expect(verificationEmailFound!.email).toBe(verificationEmail.email);
    expect(verificationEmailFound!.expirationDate.getTime()).toBe(
      verificationEmail.expirationDate.getTime()
    );
  });

  it(`WHEN call the findById method for an unexisting ID, 
  THEN should return null`, async () => {
    const verificationEmailFound = await verificationEmailMongoDBRepo.findById(
      Math.random().toString()
    );

    expect(verificationEmailFound).toBe(null);
  });

  it(`WHEN call the remove method for an ID, 
  THEN the verification email should be removed from MongoDB`, async () => {
    const verificationEmailFound = await verificationEmailMongoDBRepo.findById(
      vertificationEmails[0].id
    );

    await verificationEmailMongoDBRepo.remove(verificationEmailFound!.id);

    const notVerificationEmailFound =
      await verificationEmailMongoDBRepo.findById(vertificationEmails[0].id);

    expect(notVerificationEmailFound).toBe(null);
  });
});
