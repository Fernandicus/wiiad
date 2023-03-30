import { SendWatchingAdActionHandler } from "../use-case/handlers/SendWatchingAdActionHandler";
import { SendWatchingAdAction } from "../use-case/SendWatchingAdAction";
import { WatchingAdFetchApiCall } from "./WatchingAdFetchApiCall";

const watchingAdApiCall = new WatchingAdFetchApiCall();
const sendWatchingAdAction = new SendWatchingAdAction(watchingAdApiCall);
export const sendWatchingAdActionHandler = new SendWatchingAdActionHandler(sendWatchingAdAction);
