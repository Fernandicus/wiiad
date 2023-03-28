import { setTestReferralDB } from "../../../../__mocks__/lib/infrastructure/db/TestReferralDB";
import getReferralData, { IApiRespReferralGetData } from "@/pages/api/v1/referral/get-data";
import { mockedContext } from "../../../../__mocks__/context/MockContext";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { UniqId } from "@/src/common/domain/UniqId";
import { Role, RoleType } from "@/src/common/domain/Role";
import { User } from "@/src/modules/users/user/domain/User";
import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";

describe("On api/v1/referral/get-data, GIVEN a test referrals", () => {
  let user: User;

  beforeAll(async () => {
    const users = FakeUser.createMany(3);
    user = users[0];
    const userIds = users.map((user) => user.id);
    const db = await setTestReferralDB(userIds);
  });

  it("WHEN send a non GET request, THEN status code should not be 200", async () => {
    const { req, res } = mockedContext({ method: "PUT" });
    await getReferralData(req, res);
    expect(res.statusCode).not.toBe(200);
  });

  it(`WHEN send a GET request without an init session, 
  THEN status code should not be 200`, async () => {
    const { req, res } = mockedContext({ method: "GET" });
    await getReferralData(req, res);
    expect(res.statusCode).not.toBe(200);
  });

  it(`WHEN send a GET request with a session role of Agency, 
  THEN status code should not be 200`, async () => {
    const { req, res } = mockedContext({ method: "GET" });

    const agency = FakeUser.createWithRole({
      id: UniqId.new(),
      role: new Role(RoleType.AGENCY),
    });

    userSession.setFromServer({ req, res }, agency.toPrimitives());

    await getReferralData(req, res);
    expect(res.statusCode).not.toBe(200);
  });

  it(`WHEN send a GET request with a session role of User without referrals,
  THEN status code should not be 200`, async () => {
    const { req, res } = mockedContext({ method: "GET" });

    const userWithoutReferrals = FakeUser.createWithRole({
      id: UniqId.new(),
      role: new Role(RoleType.USER),
    });

    userSession.setFromServer(
      { req, res },
      userWithoutReferrals.toPrimitives()
    );

    await getReferralData(req, res);
    expect(res.statusCode).not.toBe(200);
  });

  it(`WHEN send a GET request with a session role of User with referrals, 
  THEN status code should be 200`, async () => {
    const { req, res } = mockedContext({ method: "GET" });

    userSession.setFromServer({ req, res }, user.toPrimitives());

    await getReferralData(req, res);

    const apiResp = res._getJSONData() as IApiRespReferralGetData;

    expect(res.statusCode).toBe(200);
    expect(apiResp.data?.userId).toContain(user.id.id);
  });
});
