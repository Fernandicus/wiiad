import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { IAdsCtxState } from "context/advertisers/modules/ads/domain/interfaces/IAdsContext";
import { storeAdsReducer } from "context/advertisers/modules/ads/infrastructure/ads-slices";
import { useDispatch, useSelector } from "react-redux";

interface IUseAds {
  ads: AdPropsPrimitives[];
  storeAds(ads: AdPropsPrimitives[]): void;
}

export const useAds = (): IUseAds => {
  const ads = useSelector((state: IAdsCtxState) => state.ads.ads);
  const dispatch = useDispatch();

  return {
    ads,
    storeAds: (ads: AdPropsPrimitives[]): void => {
      if (ads.length == 0)
      throw new Error("Store ads can't contain an empty array");
      dispatch(storeAdsReducer({ ads }));
    },
  };
};
