import { AdCreatorHandler } from "../use-case/handlers/AdCreatorHandler";
import { AdFinderHandler } from "../use-case/handlers/AdFinderHandler";
import { AdRemoverHandler } from "../use-case/handlers/AdRemoverHandler";
import { AdMongoDBRepository } from "./db/AdMongoDBRepository";
import { CreateAd } from "../use-case/CreateAd";
import { FindAds } from "../use-case/FindAds";
import { RemoveAd } from "../use-case/RemoveAd";

const adRepository = new AdMongoDBRepository();
const findAds = new FindAds(adRepository);
export const adFinderHandler = new AdFinderHandler(findAds);

const removeAd = new RemoveAd(adRepository);
export const adRemoverHandler = new AdRemoverHandler(removeAd);

const createAd = new CreateAd(adRepository);
export const adCreatorHandler = new AdCreatorHandler(createAd);
