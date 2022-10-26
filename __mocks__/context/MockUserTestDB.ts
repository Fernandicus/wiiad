import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { TestUserRepository } from "__mocks__/lib/modules/user/domain/TestUserRepository";
import { FakeUser } from "../../__mocks__/lib/modules/user/FakeUser";
import { TestUserMongoDBRepo } from "../../__mocks__/lib/modules/user/infrastructure/TestUserMongoDBRepo";

export const mockedUserRepo = async (
  amount: number
): Promise<MockUserTestDB> => {
  const testUserRepo = await TestUserMongoDBRepo.init();
  return MockUserTestDB.setAndInit(testUserRepo, amount);
};

export class MockUserTestDB {
  readonly testUserRepo;

  private constructor(testUserRepo: TestUserRepository) {
    this.testUserRepo = testUserRepo;
  }

  static async setAndInit(
    testUserRepo: TestUserRepository,
    amount: number
  ): Promise<MockUserTestDB> {
    const users = this.setUsers(amount);
    await testUserRepo.saveMany(users);

    return new MockUserTestDB(testUserRepo);
  }

  async saveMany(userPrimitives: IUserPrimitives[]): Promise<void> {
    await this.testUserRepo.saveMany(userPrimitives);
  }

  async getAll(): Promise<IUserPrimitives[] | null> {
    const users = await this.testUserRepo.getAll();
    return users;
  }

  private static setUsers(amount: number): IUserPrimitives[] {
    return FakeUser.createManyWithPrimitives(5);
  }
}
