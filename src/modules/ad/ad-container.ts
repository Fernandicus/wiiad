import { AdCreatorHandler } from "./handler/AdCreatorHandler";
import { AdFinderHandler } from "./handler/AdFinderHandler";
import { AdRemoverHandler } from "./handler/AdRemoverHandler";
import { AdMongoDBRepository } from "./infraestructure/AdMongoDBRepository";
import { CreateAd } from "./use-case/CreateAd";
import { FindAds } from "./use-case/FindAds";
import { RemoveAd } from "./use-case/RemoveAd";

const adRepository = new AdMongoDBRepository();
const findAds = new FindAds(adRepository);
export const adFinderHandler = new AdFinderHandler(findAds);

const removeAd = new RemoveAd(adRepository);
export const adRemoverHandler = new AdRemoverHandler(removeAd);

const createAd = new CreateAd(adRepository);
export const adCreatorHandler = new AdCreatorHandler(createAd);
