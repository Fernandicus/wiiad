import { IUserRepo } from "@/src/modules/user/domain/IUserRepo";
import { User } from "@/src/modules/user/domain/User";
import { CreateUser } from "@/src/modules/user/use-case/CreateUser";
import { UniqId } from "@/src/utils/UniqId";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";

describe("On CreateUser, GIVEN a user", () => {
  let userRepo: IUserRepo;
  let newUser: User;
  let createUser: CreateUser;

  beforeAll(() => {
    userRepo = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findByUserName: jest.fn(),
    };
    newUser = FakeUser.create(UniqId.new());
    createUser = new CreateUser(userRepo);
  });

  it(`WHEN call create, THEN user repo save method should be called with user primitives`, async () => {
    await createUser.create(newUser);
    expect(userRepo.save).toBeCalledWith(newUser);
  });
});
