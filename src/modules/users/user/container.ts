import { User } from "./domain/User";
import { CreateUserHandler } from "./handler/CreateUserHandler";
import { FindAdvertiserHandler } from "./handler/FindAdvertiserHandler";
import { FindUserHandler } from "./handler/FindUserHandler";
import { UpdateUserHandler } from "./handler/UpdateUserHandler";
import { UserMongoDBRepo } from "./infrastructure/UserMongoDBRepo";
import { CreateUser } from "./use-case/CreateUser";
import { FindAdvertiser } from "./use-case/FindAdvertiser";
import { FindUser } from "./use-case/FindUser";
import { UpdateUser } from "./use-case/UpdateUser";

const userRepo = new UserMongoDBRepo();
const createUser = new CreateUser(userRepo);
const findUser = new FindUser(userRepo);
const findAdvertiser = new FindAdvertiser(userRepo);

export const createUserHandler = new CreateUserHandler(createUser);
export const findUserHandler = new FindUserHandler(findUser);
export const findAdvertiserHandler = new FindAdvertiserHandler(findAdvertiser);

const updateData = new UpdateUser(userRepo)
export const updateDataHandler = new UpdateUserHandler(updateData)
