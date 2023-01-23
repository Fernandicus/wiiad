import { CreateAd } from "../use-case/CreateAd";
import { CreateAdHandler } from "../use-case/handler/CreateAdHandler";
import { FetchAdsApiCalls } from "./FetchAdsApiCall";

const fetchAd = new FetchAdsApiCalls();
const createAd = new CreateAd(fetchAd);
export const createAdHandler = new CreateAdHandler(createAd);
