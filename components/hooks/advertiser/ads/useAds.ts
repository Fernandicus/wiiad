import {
  createAdHandler,
  removeAdHandler,
} from "@/components/src/advertiser/ads/infrastructure/ads-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { IAdsCtxState } from "@/context/advertisers/ads/domain/interfaces/IAdsContext";
import {
  createAd,
  removeAd,
  removeAdReducer,
  storeAdsReducer,
} from "@/context/advertisers/ads/infrastructure/ads-slices";
import { useDispatch, useSelector } from "react-redux";
import { useCampaigns } from "../campaigns/useCampaigns";
import { AppDispatch, store } from "@/context/common/infrastructure/store";

interface IUseAds {
  ads: AdPropsPrimitives[];
  createAd(ads: AdPropsPrimitives): Promise<void>;
  removeAd(adId: string): Promise<void>;
  storeAds(ads: AdPropsPrimitives[]): void;
}

export const useAds = (): IUseAds => {
  const { removeCampaignsByAdId } = useCampaigns();
  const ads = useSelector((state: IAdsCtxState) => state.ads.ads);
  const dispatch = useDispatch<AppDispatch>();

  return {
    ads,
    createAd: async (ad: AdPropsPrimitives) => {
      await dispatch(createAd(ad));
    },
    removeAd: async (adId: string) => {
      await dispatch(removeAd(adId));
      removeCampaignsByAdId(adId);
    },
    storeAds: (ads: AdPropsPrimitives[]): void => {
      dispatch(storeAdsReducer({ ads }));
    },
  };
};
