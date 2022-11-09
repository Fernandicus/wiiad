import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { ErrorFindingUser } from "@/src/modules/user/domain/ErrorFindingUser";
import { IUserRepo } from "@/src/modules/user/domain/IUserRepo";
import { User } from "@/src/modules/user/domain/User";
import { FindUser } from "@/src/modules/user/use-case/FindUser";
import { UniqId } from "@/src/utils/UniqId";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";

describe("On FindUser, GIVEN a user", () => {
  let userRepo: IUserRepo;
  let user: User;
  let findUser: FindUser;

  beforeAll(() => {
    user = FakeUser.create(UniqId.new());
    userRepo = {
      save: jest.fn(),
      findByEmail: jest.fn().mockImplementation((email: Email) => {
        if (email.email !== user.email.email) return null;
        return user;
      }),
      findByUserName: jest.fn().mockImplementation((name: Name) => {
        if (name.name !== user.name.name) return null;
        return user;
      }),
    };
    findUser = new FindUser(userRepo);
  });

  it(`WHEN call create, THEN user repo save method should be called with user email`, async () => {
    const userFound = await findUser.findByEmail(user.email);
    expect(userRepo.findByEmail).toBeCalledWith(user.email);
    expect(userFound).toEqual(user);
  });

  it(`WHEN call findByUserName for an existing user name, 
  THEN user repo findByUserName method should be called with user name`, async () => {
    const userFound = await findUser.findUserName(user.name);
    expect(userRepo.findByUserName).toBeCalledWith(user.name);
    expect(userFound).toEqual(user);
  });

  it(`WHEN call findByUserName for a not existing user name, 
  THEN an ErrorFingindUser exception should be thrown`, async () => {
    const nonExistingName = new Name("X");
    expect(findUser.findUserName(nonExistingName)).rejects.toThrowError(
      ErrorFindingUser
    );
  });

  it(`WHEN call findByEmail for an existing user email, 
  THEN user repo findByEmail method should be called with user email`, async () => {
    const userFound = await findUser.findByEmail(user.email);
    expect(userRepo.findByEmail).toBeCalledWith(user.email);
    expect(userFound).toEqual(user);
  });

  it(`WHEN call findByUserName for a not existing user email, 
  THEN an ErrorFingindUser exception should be thrown`, async () => {
    const nonExistingEmail = new Email("x@x.com");
    expect(findUser.findByEmail(nonExistingEmail)).rejects.toThrowError(
      ErrorFindingUser
    );
  });
});
