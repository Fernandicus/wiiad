import {  User } from "@/src/modules/user/domain/User";

export interface TestUserRepository {
    save(user: User): Promise<void>;
    saveMany(users: User[]): Promise<void>;
    getAll(): Promise<User[] | null>;
}