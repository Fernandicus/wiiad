import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Role, RoleType } from "@/src/domain/Role";
import { BankAccount } from "@/src/modules/user/domain/BankAccount";
import { IUserRepo } from "@/src/modules/user/domain/IUserRepo";
import { User } from "@/src/modules/user/domain/User";
import { CreateUser } from "@/src/modules/user/use-case/CreateUser";
import { FindUser } from "@/src/modules/user/use-case/FindUser";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";

describe("On FindUser, GIVEN a user", () => {
  let userRepo: IUserRepo;
  let user: User;
  let findUser: FindUser;

  beforeAll(() => {
    user = new User({
      id: UniqId.new(),
      email: new Email(faker.internet.email()),
      name: new Name(faker.name.firstName()),
      role: new Role(RoleType.USER),
      bankAccount: new BankAccount("ES123123123"),
    });
    userRepo = {
      save: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue(user.toPrimitives()),
      findByUserName: jest.fn().mockResolvedValue(user.toPrimitives()),
    };
    findUser = new FindUser(userRepo);
  });

  it(`WHEN call create, THEN user repo save method should be called with user email`, async () => {
    const userFound = await findUser.findByEmail(user.email);
    expect(userRepo.findByEmail).toBeCalledWith(user.email.email);
    expect(userFound).toEqual(user);
  });

  it(`WHEN call findByUserName, THEN user repo findByUserName method should be called with user name`, async () => {
    const userFound = await findUser.findUserName(user.name);
    expect(userRepo.findByUserName).toBeCalledWith(user.name.name);
    expect(userFound).toEqual(user);
  });
});
