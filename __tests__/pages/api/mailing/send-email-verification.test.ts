import sendEmailVerification from "@/pages/api/v1/mailing/send-email-verification";
import { faker } from "@faker-js/faker";
import { TestVerificationEmailMongoDBRepo } from "../../../../__mocks__/lib/modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { RolType } from "@/src/domain/Rol";
import { MockContext } from "../../../../__mocks__/context/MockContext";
import { ISendVerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/ISendVerificationEmail";
import { mockedVerificationEmailRepo } from "../../../../__mocks__/context/MockVerificationEmailDB";
import { ErrorEmailVerification } from "@/src/modules/mailing/send-email-verification/domain/ErrorEmailVerification";

describe("On api/mailing/send-email-verification, GIVEN an user", () => {
  let user: ISendVerificationEmail;

  beforeAll(async () => {
    await mockedVerificationEmailRepo(2, 2); //await TestVerificationEmailMongoDBRepo.init();
    user = {
      email: faker.internet.email(),
      userName: faker.name.firstName(),
      rol: RolType.USER,
    };
  }, 8000);

  it(`WHEN send POST request with all the required data for new user,
  THEN return status code 200`, async () => {
    const { req, res } = MockContext("POST", { data: user, isNewUser: true });

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(200);
  }, 8000);

  it(`WHEN send POST request with all the required data for an existing user,
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("POST", { data: user, isNewUser: false });

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);

  it(`WHEN send GET request, 
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("GET", { data: user });

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request without the required data, 
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("POST", { data: {} });

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(400);
  });
});
