import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { IUserRepo } from "@/src/modules/users/user/domain/IUserRepo";
import { User } from "@/src/modules/users/user/domain/User";
import { FakeAdvertiser } from "../lib/modules/user/FakeAdvertiser";
import { FakeUser } from "../../__mocks__/lib/modules/user/FakeUser";

export const mockedUserRepo = (userToFind: User): IUserRepo => {
  const fakeUsers = FakeUser.createMany(4);
  const users = [...fakeUsers, userToFind];
  return {
    save: jest.fn(),
    findUserByEmail: jest
      .fn()
      .mockImplementation((email: Email): User | null => {
        const userFound = users.find((user) => user.email.email == email.email);
        if (!userFound) return null;
        return userFound;
      }),
    findUserByName: jest.fn().mockImplementation((name: Name): User | null => {
      const userFound = users.find((user) => user.name.name == name.name);
      if (!userFound) return null;
      return userFound;
    }),
    findAdvertiserByEmail: jest.fn(),
    findAdvertiserByName: jest.fn(),
  };
};

export const mockedAdvertiserRepo = (advertiserToFind: User): IUserRepo => {
  const fakeAdvertisers = FakeAdvertiser.createMany(4);
  const advertisers = [...fakeAdvertisers, advertiserToFind];

  return {
    save: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserByName: jest.fn(),
    findAdvertiserByEmail: jest
      .fn()
      .mockImplementation((email: Email): User | null => {
        const userFound = advertisers.find(
          (advertiser) => advertiser.email.email == email.email
        );
        if (!userFound) return null;
        return userFound;
      }),
    findAdvertiserByName: jest
      .fn()
      .mockImplementation((name: Name): User | null => {
        const userFound = advertisers.find(
          (advertiser) => advertiser.name.name == name.name
        );
        if (!userFound) return null;
        return userFound;
      }),
  };
};
