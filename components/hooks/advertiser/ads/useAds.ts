import {
  createAdHandler,
  removeAdHandler,
} from "@/components/src/modules/advertiser/ads/infrastructure/ads-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { IAdsCtxState } from "@/context/advertisers/ads/domain/interfaces/IAdsContext";
import {
  removeAdReducer,
  storeAdsReducer,
} from "@/context/advertisers/ads/infrastructure/ads-slices";
import { useDispatch, useSelector } from "react-redux";
import { useCampaigns } from "../campaigns/useCampaigns";

interface IUseAds {
  ads: AdPropsPrimitives[];
  createAd(ads: AdPropsPrimitives): Promise<void>;
  removeAd(adId: string): Promise<void>;
  storeAds(ads: AdPropsPrimitives[]): void;
}

export const useAds = (): IUseAds => {
  const { removeCampaigns_byAdId, storeCampaigns } = useCampaigns();
  const ads = useSelector((state: IAdsCtxState) => state.ads.ads);
  const dispatch = useDispatch();

  const createAd = async (ad: AdPropsPrimitives) => {
    if (!ad) throw new Error("Create ad can't contain an empty ad");
    await createAdHandler.create(ad);
    dispatch(storeAdsReducer({ ads: [ad] }));
  };

  const removeAd = async (adId: string) => {
    if (!adId) throw new Error("Remove ad can't contain an empty ad id");
    await removeAdHandler.remove(adId);
    dispatch(removeAdReducer({ ads, adId }));
    removeCampaigns_byAdId(adId);
  };

  return {
    ads,
    createAd,
    removeAd,
    storeAds: (ads: AdPropsPrimitives[]): void => {
      dispatch(storeAdsReducer({ ads }));
    },
  };
};
