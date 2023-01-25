import { Ad } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";

export interface IAdsApiCalls{
    createAd(ad:Ad):Promise<void>;
    removeAd(adId:UniqId):Promise<void>
} 