import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  adsSliceActions,
  createAd,
  removeAd,
} from "@/context/advertisers/ads/ads-slices";
import { useDispatch, useSelector } from "react-redux";
import { useCampaigns } from "../campaigns/useCampaigns";
import { AppDispatch, TAdsState } from "@/context/store";

interface IUseAds {
  ads: AdPropsPrimitives[];
  createAd(ads: AdPropsPrimitives): Promise<void>;
  removeAd(adId: string): Promise<void>;
  storeAds(ads: AdPropsPrimitives[]): void;
}

export const useAds = (): IUseAds => {
  const { storeAds } = adsSliceActions;
  const { removeCampaignByAdId } = useCampaigns();
  const ads = useSelector((state: TAdsState) => state.ads.ads);
  const dispatch = useDispatch<AppDispatch>();

  return {
    ads,
    createAd: async (ad: AdPropsPrimitives) => {
      await dispatch(createAd(ad));
    },
    removeAd: async (adId: string) => {
      await dispatch(removeAd(adId));
      removeCampaignByAdId(adId);
    },
    storeAds: (ads: AdPropsPrimitives[]): void => {
      dispatch(storeAds({ ads }));
    },
  };
};
