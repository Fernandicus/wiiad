import { useAds } from "@/components/hooks/advertiser/ads/useAds";
import { useCampaigns } from "@/components/hooks/advertiser/campaigns/useCampaigns";
import { RemoveButton } from "@/components/ui/buttons/RemoveButton";
import { NotificationData } from "@/components/ui/notifications/Notifications";

interface IRemoveAdButton {
  adId: string;
  andCampaign?: boolean;
  handleResponse(data: NotificationData): void;
}

export const RemoveAdButton = ({
  adId,
  handleResponse,
  andCampaign = false,
}: IRemoveAdButton) => {
  const { removeAd } = useAds();

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

  return <RemoveButton onRemove={() => deleteAd(adId)}>Eliminar</RemoveButton>;
};
