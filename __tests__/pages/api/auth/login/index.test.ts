import apiSendLoginEmail, {
  APISendEmailVerification,
} from "@/pages/api/v1/auth/login/index";
import { User } from "@/src/modules/users/user/domain/User";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { TestDBs } from "../../../../../__mocks__/lib/infrastructure/db/TestDBs";

//TODO: Tests for api/v1/auth/login/index
describe("On api/v1/auth/login/index, GIVEN ....", () => {
  let users: User[];
  let advertisers: User[];

  beforeAll(async () => {
    const testDB = await TestDBs.setAndInitAll();
    users = testDB.users;
    advertisers = testDB.advertisers;
  });

  it(`WHEN send a non 'POST' method,
  THEN return status 400`, async () => {
    const { req, res } = mockedContext({ method: "GET" });
    await apiSendLoginEmail(req, res);

    expect(res.statusCode).toBe(400);
  });

  it.only(`WHEN send a 'POST' method without data,
  THEN return status 400`, async () => {
    const { req, res } = mockedContext({ method: "POST" });
    await apiSendLoginEmail(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a 'POST' method with an existing user and set isNewUser to 'true',
  THEN return status 400`, async () => {
    const user = users[0];

    const body: APISendEmailVerification = {
      isNewUser: true,
      data: {
        email: user.email.email,
        userName: user.name.name,
        role: user.role.role,
      },
    };

    const { req, res } = mockedContext({ method: "POST", body });
    await apiSendLoginEmail(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a 'POST' method with an existing user and set isNewUser to 'false',
  THEN return status 200`, async () => {
    const user = users[0];

    const body: APISendEmailVerification = {
      isNewUser: false,
      data: {
        email: user.email.email,
        userName: user.name.name,
        role: user.role.role,
      },
    };

    const { req, res } = mockedContext({ method: "POST", body });
    await apiSendLoginEmail(req, res);

    expect(res.statusCode).toBe(200);
  });

  it(`WHEN send a 'POST' method with an existing advertiser and set isNewUser to 'true',
  THEN return status 400`, async () => {
    const advertiser = advertisers[0];

    const body: APISendEmailVerification = {
      isNewUser: true,
      data: {
        email: advertiser.email.email,
        userName: advertiser.name.name,
        role: advertiser.role.role,
      },
    };

    const { req, res } = mockedContext({ method: "POST", body });
    await apiSendLoginEmail(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a 'POST' method with an existing advertiser and set isNewUser to 'false',
  THEN return status 200`, async () => {
    const advertiser = advertisers[0];

    const body: APISendEmailVerification = {
      isNewUser: false,
      data: {
        email: advertiser.email.email,
        userName: advertiser.name.name,
        role: advertiser.role.role,
      },
    };

    const { req, res } = mockedContext({ method: "POST", body });
    await apiSendLoginEmail(req, res);

    expect(res.statusCode).toBe(200);
  });
});
