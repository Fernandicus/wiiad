import { CreateAd } from "../use-case/CreateAd";
import { CreateAdHandler } from "../use-case/handler/CreateAdHandler";
import { FetchAdsApiCalls } from "./FetchAdsApiCall";
import { RemoveAd } from "../use-case/RemoveAd";
import { RemoveAdHandler } from "../use-case/handler/RemoveAdHandler";

const fetchAd = new FetchAdsApiCalls();
const createAd = new CreateAd(fetchAd);
const removeAd = new RemoveAd(fetchAd)
export const createAdHandler = new CreateAdHandler(createAd);
export const removeAdHandler = new RemoveAdHandler(removeAd);
