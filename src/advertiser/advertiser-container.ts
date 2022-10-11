import { AdvertiserCreatorHandler } from "./handler/AdvertiserCreatorHandler";
import { FindAdvertiserHandler } from "./handler/FindAdvertiserHandler";
import { AdvertiserMongoDBRepo } from "./infraestructure/AdvertiserMongoDBRepo";
import { CreateAdvertiser } from "./use-case/CreateAdvertiser";
import { FindAdvertiser } from "./use-case/FindAdvertiser";

const advertiserRepo = new AdvertiserMongoDBRepo();
const createAdvertiser = new CreateAdvertiser(advertiserRepo);
export const createAdvertiserHandler = new AdvertiserCreatorHandler(createAdvertiser);

const findAdvertiser = new FindAdvertiser(advertiserRepo);
export const findAdvertiserHandler = new FindAdvertiserHandler(findAdvertiser);