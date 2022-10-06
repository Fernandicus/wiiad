import { VerificationEmailModel } from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestVerificationEmailMongoDBRepo } from "../../../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";

describe("On VerificationEmailMongoDBRepo, GIVEN some verification emails in MongoDB", () => {
  let verificationEmailRepo: TestVerificationEmailMongoDBRepo;

  beforeAll(async () => {
     const verificationEmailRepo = await TestVerificationEmailMongoDBRepo.init();
    
  });

  it(`WHEN ...., THEN ...`, () => {
    expect(null).toBe(null);
  });
});
