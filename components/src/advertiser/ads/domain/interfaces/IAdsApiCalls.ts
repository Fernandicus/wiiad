import { Ad } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/common/domain/UniqId";

export interface IAdsApiCalls{
    createAd(ad:Ad):Promise<void>;
    removeAd(adId:UniqId):Promise<void>
} 