import { AdvertiserCreatorHandler } from "./handler/AdvertiserCreatorHandler";
import { AdvertiserMongoDBRepo } from "./infraestructure/AdvertiserMongoDBRepo";
import { CreateAdvertiser } from "./use-case/CreateAdvertiser";

const advertiserRepo = new AdvertiserMongoDBRepo();
const createAdvertiser = new CreateAdvertiser(advertiserRepo);
export const advertiserHandler = new AdvertiserCreatorHandler(createAdvertiser);