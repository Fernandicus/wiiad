import { Ad } from "@/src/modules/ad/domain/Ad";

export interface IAdsApiCalls{
    createAd(ad:Ad):Promise<void>
} 