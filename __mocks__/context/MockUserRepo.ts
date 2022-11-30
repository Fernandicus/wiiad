import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { IUserRepo } from "@/src/modules/user/domain/IUserRepo";
import { User } from "@/src/modules/user/domain/User";
import { FakeUser } from "../../__mocks__/lib/modules/user/FakeUser";

export const mockedUserRepo = (userToFind: User) : IUserRepo=> {
  const fakeUsers = FakeUser.createMany(4);
  const users = [...fakeUsers, userToFind];
  return {
    save: jest.fn(),
    findByEmail: jest.fn().mockImplementation((email: Email) : User | null => {
      const userFound = users.find((user) => user.email.email == email.email);
      if (!userFound) return null;
      return userFound;
    }),
    findByUserName: jest.fn().mockImplementation((name: Name) : User | null => {
      const userFound = users.find((user) => user.name.name == name.name);
      if (!userFound) return null;
      return userFound;
    }),
  };
};
