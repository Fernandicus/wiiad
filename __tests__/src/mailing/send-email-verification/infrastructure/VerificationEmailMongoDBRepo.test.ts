import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { IVerificationEmailTimerPrimitives } from "@/src/mailing/send-email-verification/domain/VerificationEmailTimer";
import { VerificationEmailMongoDBRepo } from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";

describe("On VerificationEmailMongoDBRepo, GIVEN some verification emails in MongoDB", () => {
  let verificationEmailMongoRepo: TestVerificationEmailMongoDBRepo;
  let vertificationEmails: IVerificationEmailTimerPrimitives[];
  let verificationEmailMongoDBRepo: VerificationEmailMongoDBRepo;

  beforeAll(async () => {
    verificationEmailMongoRepo = await TestVerificationEmailMongoDBRepo.init();
    vertificationEmails = FakeVerificationEmailTimer.createManyWithPrimitives(2);
    await verificationEmailMongoRepo.saveMany(vertificationEmails);
    verificationEmailMongoDBRepo = new VerificationEmailMongoDBRepo();
  });

  afterAll(async () => {
    await TestVerificationEmailMongoDBRepo.disconnectMongoDB();
  });

  it(`WHEN call the VerificationEmailMongoDBRepo save method, 
  THEN WHEN call the findById method the verification email should be found in MongoDB`, async () => {
    const verificationEmail = FakeVerificationEmailTimer.createWithPrimitives();
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

  it(`WHEN call the VerificationEmailMongoDBRepo findById method for an unexisting ID, 
  THEN should return null`, async () => {
    const verificationEmailFound = await verificationEmailMongoDBRepo.findById(
      Math.random().toString()
    );

    expect(verificationEmailFound).toBe(null);
  });

  it(`WHEN call the VerificationEmailMongoDBRepo remove method for an ID, 
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
