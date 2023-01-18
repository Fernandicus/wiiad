import sendEmailVerification from "@/pages/api/v1/auth/login";
import { faker } from "@faker-js/faker";
import { TestVerificationEmailMongoDBRepo } from "../../../../__mocks__/lib/modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { RoleType } from "@/src/common/domain/Role";
import { mockedContext } from "../../../../__mocks__/context/MockContext";
import { IVerificationEmailData } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IVerificationEmailData";
//import { autoSetTestVerificationEmailDB } from "../../../../__mocks__/lib/infrastructure/db/TestVerificationEmailDB";

describe("On api/mailing/send-email-verification, GIVEN an user", () => {
  let user: IVerificationEmailData;

  beforeAll(async () => {
    //await autoSetTestVerificationEmailDB(2, 2);
    user = {
      email: faker.internet.email(),
      userName: faker.name.firstName(),
      role: RoleType.USER,
    };
  }, 8000);

  it(`WHEN send POST request with all the required data for new user,
  THEN return status code 200`, async () => {
    const { req, res } = mockedContext({method:"POST", body:{ data: user, isNewUser: true }});

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(200);
  }, 8000);

  it(`WHEN send POST request with all the required data for an existing user,
  THEN return status code 400`, async () => {
    const { req, res } = mockedContext({method:"POST", body:{ data: user, isNewUser: false }});

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);

  it(`WHEN send GET request, 
  THEN return status code 400`, async () => {
    const { req, res } = mockedContext({method:"GET", body:{ data: user }});

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request without the required data, 
  THEN return status code 400`, async () => {
    const { req, res } = mockedContext({method:"POST", body:{ data: {} }});

    await sendEmailVerification(req, res);

    expect(res.statusCode).toBe(400);
  });
});
