import { useAds } from "@/components/hooks/advertiser/ads/useAds";
import { useCampaigns } from "@/components/hooks/advertiser/campaigns/useCampaigns";
import { RemoveButton } from "@/components/ui/buttons/RemoveButton";
import { useNotification } from "@/components/ui/notifications/hooks/useNotification";

interface IRemoveAdButton {
  adId: string;
  andCampaign?: boolean;
}

export const RemoveAdButton = ({
  adId,
  andCampaign = false,
}: IRemoveAdButton) => {
  const { removeAd } = useAds();
  const {setNotification} = useNotification();

  const deleteAd = async (id: string) => {
    try {
      await removeAd(id);
      setNotification({
        message: "Anuncio eliminado",
        status: "success",
      });
    } catch (err) {
      setNotification({
        message: "No se pudo eliminar el anuncio",
        status: "error",
      });
    }
  };

  return <RemoveButton onRemove={() => deleteAd(adId)}>Eliminar</RemoveButton>;
};
