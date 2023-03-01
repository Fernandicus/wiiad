import updateProfile, {
  IApiReqUpdateProfile,
} from "@/pages/api/v1/profile/update";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IUserPrimitives, User } from "@/src/modules/users/user/domain/User";
import { faker } from "@faker-js/faker";
import { TestDBs } from "../../../../__mocks__/lib/infrastructure/db/TestDBs";
import { mockedContext } from "../../../../__mocks__/context/MockContext";
import { TestUserDB } from "__mocks__/lib/infrastructure/db/TestUserDB";
import { RoleType } from "@/src/common/domain/Role";

describe("On Api/v1/profile/update, GIVEN a mocked DB and a User and an Advertiser ", () => {
  let user: User;
  let advertiser: User;
  let usersDB: TestUserDB;

  beforeAll(async () => {
    const db = await TestDBs.setAndInitAll();
    user = db.users[0];
    advertiser = db.advertisers[0];
    usersDB = db.dbs.users;
  });

  it("WHEN send a non PUT request, THEN response should not be 200", async () => {
    const { req, res } = mockedContext({
      method: "GET",
    });

    await updateProfile(req, res);

    expect(res.statusCode).not.toBe(200);
  });

  it("WHEN send a PUT request without session, THEN response should not be 200", async () => {
    const { req, res } = mockedContext({
      method: "PUT",
    });

    await updateProfile(req, res);

    expect(res.statusCode).not.toBe(200);
  });

  it("WHEN send a PUT request with session role agency, THEN response should not be 200", async () => {
    const body: IApiReqUpdateProfile = {
      name: faker.name.firstName(),
      profilePic: faker.image.imageUrl(),
    };

    const context = mockedContext({
      method: "PUT",
      body,
    });

    userSession.setFromServer(context, {
      ...user.toPrimitives(),
      role: RoleType.AGENCY,
    });

    const { req, res } = context;
    await updateProfile(req, res);

    expect(res.statusCode).not.toBe(200);
  });

  it(`WHEN update name with session role advertiser, 
  THEN response should be 200 and data should be updated`, async () => {
    const updateData: IApiReqUpdateProfile = {
      name: faker.name.firstName(),
    };

    const context = mockedContext({
      method: "PUT",
      body: updateData,
    });

    userSession.setFromServer(context, advertiser.toPrimitives());

    const { req, res } = context;
    await updateProfile(req, res);

    expect(res.statusCode).toBe(200);

    const newAdvertiser = User.fromPrimitives({
      ...advertiser.toPrimitives(),
      ...updateData,
      email: advertiser.email.email,
    });

    const usersFound = await usersDB.getAllAdvertisers();
    const found = usersFound?.find((user) => user.id.id === advertiser.id.id);

    expect(newAdvertiser.toPrimitives()).toEqual(found?.toPrimitives());
    expect(userSession.getFromServer(context)?.name).toBe(updateData.name);

    advertiser = User.fromPrimitives(newAdvertiser.toPrimitives());
  });

  it(`WHEN update email with session role advertiser, 
  THEN response should be 200 and data should be updated`, async () => {
    const updateData: IApiReqUpdateProfile = {
      email: faker.internet.email(),
    };

    const context = mockedContext({
      method: "PUT",
      body: updateData,
    });

    userSession.setFromServer(context, advertiser.toPrimitives());

    const { req, res } = context;
    await updateProfile(req, res);

    expect(res.statusCode).toBe(200);

    const newAdvertiser = User.fromPrimitives({
      ...advertiser.toPrimitives(),
      ...updateData,
      email: advertiser.email.email,
    });

    const usersFound = await usersDB.getAllAdvertisers();
    const found = usersFound?.find(
      (user) => user.id.id === advertiser.id.id
    );

    expect(newAdvertiser.toPrimitives()).toEqual(found?.toPrimitives());
    expect(userSession.getFromServer(context)?.email).not.toBe(
      updateData.email
    );

    advertiser = User.fromPrimitives(newAdvertiser.toPrimitives());
  });

  it(`WHEN update profile pic with session role advertiser, 
  THEN response should be 200 and data should be updated`, async () => {
    const updateData: IApiReqUpdateProfile = {
      profilePic: faker.image.imageUrl(),
    };

    const context = mockedContext({
      method: "PUT",
      body: updateData,
    });

    userSession.setFromServer(context, advertiser.toPrimitives());

    const { req, res } = context;
    await updateProfile(req, res);

    expect(res.statusCode).toBe(200);

    const newAdvertiser = User.fromPrimitives({
      ...advertiser.toPrimitives(),
      ...updateData,
      email: advertiser.email.email,
    });

    const usersFound = await usersDB.getAllAdvertisers();
    const found = usersFound?.find(
      (user) => user.id.id === advertiser.id.id
    );

    expect(newAdvertiser.toPrimitives()).toEqual(found?.toPrimitives());
    expect(userSession.getFromServer(context)?.profilePic).toBe(
      updateData.profilePic
    );

    advertiser = User.fromPrimitives(newAdvertiser.toPrimitives());
  });

  it(`WHEN update name, profile pic and email with session role advertiser, 
  THEN response should be 200 and data should be updated`, async () => {
    const updateData: IApiReqUpdateProfile = {
      name: faker.name.firstName(),
      profilePic: faker.image.imageUrl(),
      email: faker.internet.email(),
    };

    const context = mockedContext({
      method: "PUT",
      body: updateData,
    });

    userSession.setFromServer(context, advertiser.toPrimitives());

    const { req, res } = context;
    await updateProfile(req, res);

    expect(res.statusCode).toBe(200);

    const newAdvertiser = User.fromPrimitives({
      ...advertiser.toPrimitives(),
      ...updateData,
      email: advertiser.email.email,
    });

    const usersFound = await usersDB.getAllAdvertisers();
    const found = usersFound?.find(
      (user) => user.id.id === advertiser.id.id
    );

    expect(newAdvertiser.toPrimitives()).toEqual(found?.toPrimitives());
    expect(userSession.getFromServer(context)?.name).toBe(updateData.name);
    expect(userSession.getFromServer(context)?.profilePic).toBe(
      updateData.profilePic
    );
    expect(userSession.getFromServer(context)?.email).not.toBe(
      updateData.email
    );

    advertiser = User.fromPrimitives(newAdvertiser.toPrimitives());
  });
});
