import { IUserPrimitives, User } from "@/src/modules/user/domain/User";
import { UserMongoDBRepo } from "@/src/modules/user/infrastructure/UserMongoDBRepo";
import { CreateUser } from "@/src/modules/user/use-case/CreateUser";
import { UniqId } from "@/src/utils/UniqId";
import { TestUserMongoDBRepo } from "../../../../__mocks__/lib/user/infrastructure/TestUserMongoDBRepo";
import { FakeUser } from "../../../../__mocks__/lib/user/FakeUser";

describe("On UserMongoDBRepo, GIVEN a user", () => {
  let user: IUserPrimitives;
  let repo: UserMongoDBRepo;
  
  beforeAll(async () => {
    await TestUserMongoDBRepo.init();
    user = FakeUser.createWithPrimitives(UniqId.generate());
    repo = new UserMongoDBRepo();
  });

  it(`WHEN call save, THEN user should be saved and found in MongoDB`, async () => {
    await repo.save(user);
    const userFound = await repo.findByEmail(user.email);
    expect(userFound).toEqual(user);
  });
});
