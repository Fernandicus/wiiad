import {
  VerificationEmailModel,
  VerificationEmailModelProps,
} from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailModel";
import mongoose from "mongoose";
import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestVerificationEmailMongoDBRepo } from "../../../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { IVerificationEmailTimerPrimitives } from "@/src/mailing/send-email-verification/domain/VerificationEmailTimer";
import { VerificationEmailMongoDBRepo } from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";

describe("On VerificationEmailMongoDBRepo, GIVEN some verification emails in MongoDB", () => {
  let verificationEmailMongoRepo: TestVerificationEmailMongoDBRepo;
  let vertificationEmails: IVerificationEmailTimerPrimitives[];

  beforeAll(async () => {
    verificationEmailMongoRepo = await TestVerificationEmailMongoDBRepo.init();
    vertificationEmails = FakeVerificationEmailTimer.createManyWithPrimitives();
    await verificationEmailMongoRepo.saveMany(vertificationEmails);
  });

  afterAll(async () => {
    await TestVerificationEmailMongoDBRepo.disconnectMongoDB();
  });

  it(`WHEN call the VerificationEmailMongoDBRepo save method, 
  THEN the verification email is saved in MongoDB`, async () => {
    const verificationEmail: IVerificationEmailTimerPrimitives = {
      id: "paco123",
      email: "fer@nando.com",
      expirationDate: new Date(Date.now())
    } //FakeVerificationEmailTimer.createWithPrimitives();
    const mongoDB = new VerificationEmailMongoDBRepo();
    await mongoDB.save(verificationEmail);

    /* expect(async ()=>{
      await mongoDB.save(verificationEmail)
    }).not.toThrowError(); */
  });
});
