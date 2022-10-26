import { IUserPrimitives } from "@/src/modules/user/domain/User";

export interface TestUserRepository {
    save(user: IUserPrimitives): Promise<void>;
    saveMany(users: IUserPrimitives[]): Promise<void>;
    getAll(): Promise<IUserPrimitives[] | null>;
}