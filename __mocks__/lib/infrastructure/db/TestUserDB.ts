import {  User } from "@/src/modules/users/user/domain/User";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { TestUserRepository } from "../../modules/user/domain/TestUserRepository";
import { FakeUser } from "../../modules/user/FakeUser";
import { TestUserMongoDBRepo } from "../../modules/user/infrastructure/TestUserMongoDBRepo";

export const setTestUserDB = async (
  amount: number
): Promise<TestUserDB> => {
  const testUserRepo = await TestUserMongoDBRepo.init();
  return TestUserDB.setAndInit(testUserRepo, amount);
};

export class TestUserDB {
  readonly testUserRepo;

  private constructor(testUserRepo: TestUserRepository) {
    this.testUserRepo = testUserRepo;
  }

  static async setAndInit(
    testUserRepo: TestUserRepository,
    amount: number
  ): Promise<TestUserDB> {
    const users = this.setUsers(amount);
    const advertisers = this.setAdvertisers();
    await testUserRepo.saveMany([...users, ...advertisers]);

    return new TestUserDB(testUserRepo);
  }

  async saveMany(users: User[]): Promise<void> {
    await this.testUserRepo.saveMany(users);
  }

  async getAllUsers(): Promise<User[] | null> {
    const users = await this.testUserRepo.getAllUsers();
    return users;
  }

  async getAllAdvertisers(): Promise<User[] | null> {
    const users = await this.testUserRepo.getAllAdvertisers();
    return users;
  }

  private static setUsers(amount: number): User[] {
    return FakeUser.createMany(amount);
  }

  private static setAdvertisers(): User[] {
    return FakeAdvertiser.createMany();
  }
}
