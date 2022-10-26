import sendEmailVerification from "@/pages/api/mailing/send-email-verification";
import { faker } from "@faker-js/faker";
import { TestVerificationEmailMongoDBRepo } from "../../../../__mocks__/lib/modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { RolType } from "@/src/domain/Rol";
import { MockContext } from "../../../../__mocks__/context/MockContext";
import { ISendVerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/ISendVerificationEmail";

describe("On api/mailing/send-email-verification, GIVEN an user", () => {
  let user: ISendVerificationEmail;

  beforeAll(async () => {
    await TestVerificationEmailMongoDBRepo.init();
    user = {
      email: faker.internet.email(),
      userName: faker.name.firstName(),
      rol: RolType.USER,
    };
  }, 8000);

  it(`WHEN send POST request with all the required data,
  THEN return status code 200`, async () => {
    const { req, res } = MockContext("POST", user);

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(200);
  }, 8000);

  it(`WHEN send GET request, 
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("GET", user);

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request without the required data, 
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("POST", { userName: user.userName });

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(400);
  });
});
