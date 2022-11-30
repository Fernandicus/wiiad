import {  User } from "@/src/modules/users/user/domain/User";

export interface TestUserRepository {
    save(user: User): Promise<void>;
    saveMany(users: User[]): Promise<void>;
    getAllUsers(): Promise<User[] | null>;
    getAllAdvertisers(): Promise<User[] | null>
}