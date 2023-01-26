import { useAds } from "@/components/hooks/advertiser/modules/ads/useAds";
import { useCampaigns } from "@/components/hooks/advertiser/modules/campaigns/useCampaigns";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { RemoveButton } from "@/components/ui/buttons/RemoveButton";
import { NotificationData } from "@/components/ui/notifications/Notifications";
import { ApiRoutes } from "@/src/utils/ApiRoutes";

interface IRemoveAdButton {
  adId: string;
  andCampaign?:boolean;
  handleResponse(data: NotificationData): void;
}

export const RemoveAdButton = ({ adId, handleResponse, andCampaign = false }: IRemoveAdButton) => {
  const { removeAd } = useAds();
  const {  } = useCampaigns();

  const deleteAd = async (id: string) => {
    try {
      await removeAd(id);
      handleResponse({
        message: "Anuncio eliminado",
        status: "success",
      });
    } catch (err) {
      handleResponse({
        message: "No se pudo eliminar el anuncio",
        status: "error",
      });
    }
  };

 /*  //TODO: Remove Ads and Campaigns
  const deleteAdAndCampaign = async (id: string) => {
    try {
      await removeAd(id);
      handleResponse({
        message: "Anuncio eliminado",
        status: "success",
      });
    } catch (err) {
      handleResponse({
        message: "No se pudo eliminar el anuncio",
        status: "error",
      });
    }
  }; */

  return (
    <RemoveButton onRemove={() => deleteAd(adId)}>
      Eliminar anuncio
    </RemoveButton>
  );
};
