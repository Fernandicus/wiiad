import { IUserRepo } from "@/src/modules/user/domain/IUserRepo";
import { User } from "@/src/modules/user/domain/User";
import { CreateUser } from "@/src/modules/user/use-case/CreateUser";
import { UniqId } from "@/src/utils/UniqId";
import { mockedUserRepo } from "../../../../__mocks__/context/MockUserRepo";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";

describe("On CreateUser, GIVEN a user", () => {
  let userRepo: IUserRepo;
  let user: User;
  let createUser: CreateUser;

  beforeAll(() => {
    user = FakeUser.create(UniqId.new());
    userRepo = mockedUserRepo(user);
    createUser = new CreateUser(userRepo);
  });

  it(`WHEN call create, THEN user repo save method should be called with user primitives`, async () => {
    await createUser.create(user);
    expect(userRepo.save).toBeCalledWith(user);
  });
});
