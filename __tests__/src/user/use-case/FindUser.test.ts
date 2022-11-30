import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ErrorFindingUser } from "@/src/modules/users/user/domain/ErrorFindingUser";
import { IUserRepo } from "@/src/modules/users/user/domain/IUserRepo";
import { User } from "@/src/modules/users/user/domain/User";
import { FindUser } from "@/src/modules/users/user/use-case/FindUser";
import { UniqId } from "@/src/utils/UniqId";
import { mockedUserRepo } from "../../../../__mocks__/context/MockUserRepo";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";

describe("On FindUser, GIVEN a user", () => {
  let userRepo: IUserRepo;
  let user: User;
  let findUser: FindUser;

  beforeAll(() => {
    user = FakeUser.create(UniqId.new());
    userRepo = mockedUserRepo(user)
    findUser = new FindUser(userRepo);
  });

  it(`WHEN call create, THEN user repo save method should be called with user email`, async () => {
    const userFound = await findUser.byEmail(user.email);
    expect(userRepo.findUserByEmail).toBeCalledWith(user.email);
    expect(userFound).toEqual(user);
  });

  it(`WHEN call byUserName for an existing user name, 
  THEN user repo byUserName method should be called with user name`, async () => {
    const userFound = await findUser.byName(user.name);
    expect(userRepo.findUserByName).toBeCalledWith(user.name);
    expect(userFound).toEqual(user);
  });

  it(`WHEN call findByUserName for a not existing user name, 
  THEN an ErrorFingindUser exception should be thrown`, async () => {
    const nonExistingName = new Name("X");
    expect(findUser.byName(nonExistingName)).rejects.toThrowError(
      ErrorFindingUser
    );
  });

  it(`WHEN call findByEmail for an existing user email, 
  THEN user repo findByEmail method should be called with user email`, async () => {
    const userFound = await findUser.byEmail(user.email);
    expect(userRepo.findUserByEmail).toBeCalledWith(user.email);
    expect(userFound).toEqual(user);
  });

  it(`WHEN call findByUserName for a not existing user email, 
  THEN an ErrorFingindUser exception should be thrown`, async () => {
    const nonExistingEmail = new Email("x@x.com");
    expect(findUser.byEmail(nonExistingEmail)).rejects.toThrowError(
      ErrorFindingUser
    );
  });
});
