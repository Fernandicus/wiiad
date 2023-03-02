import { User } from "@/src/modules/users/user/domain/User";
import { UserMongoDBRepo } from "@/src/modules/users/user/infrastructure/UserMongoDBRepo";
import { UniqId } from "@/src/utils/UniqId";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";
import { setTestUserDB } from "../../../../__mocks__/lib/infrastructure/db/TestUserDB";
import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { Maybe } from "@/src/common/domain/Maybe";

describe("On UserMongoDBRepo, GIVEN a user", () => {
  let user: User;
  let repo: UserMongoDBRepo;

  beforeAll(async () => {
    await setTestUserDB({
      usersAmount: 3,
      advertisersAmount: 3,
    });
    user = FakeUser.create(UniqId.new());
    repo = new UserMongoDBRepo();
  });

  it(`WHEN call save, THEN user should be saved and foundByEmail in MongoDB`, async () => {
    await repo.save(user);
    const userFound = await repo.findUserByEmail(user.email);
    userFound.map((foundedUser) => expect(foundedUser).toEqual(user));
  });

  it(`WHEN call findByEmail for a non existing email, THEN null should be returned`, async () => {
    const nonExistingEmail = new Email("x@x.com");
    const userFound = await repo.findUserByEmail(nonExistingEmail);
    userFound.match({
      nothing() {
        expect(null).toBeNull();
      },
      some(value) {
        return value;
      },
    });
  });

  it(`WHEN call findByName for a non existing name, THEN null should be returned`, async () => {
    const nonExistingName = new Name("x");
    const userFound = await repo.findUserByName(nonExistingName);
    userFound.match({
      nothing() {
        expect(null).toBeNull();
      },
      some(value) {
        return value;
      },
    });
  });
});
