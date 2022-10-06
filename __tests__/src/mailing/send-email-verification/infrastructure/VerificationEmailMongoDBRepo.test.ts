import { VerificationEmailModel } from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailModel";
import mongoose from "mongoose";
import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestVerificationEmailMongoDBRepo } from "../../../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";

describe("On VerificationEmailMongoDBRepo, GIVEN some verification emails in MongoDB", () => {
  let verificationEmailRepo: TestVerificationEmailMongoDBRepo;

  beforeAll(async () => {
     const verificationEmailRepo = await TestVerificationEmailMongoDBRepo.init();
     const vertificationEmails = FakeVerificationEmailTimer.createMany();
     console.log(vertificationEmails);
     //TODO: await verificationEmailRepo.saveMany();
    
  });

  it(`WHEN ...., THEN ...`, () => {
    expect(null).toBe(false);
  });
});
