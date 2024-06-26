import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { PrimaryButton } from "../../buttons/PrimaryButton";

export function EmptyAds() {
  const {status} = useAdvertiser()
  return (
    <div className="py-20 space-y-2 text-center">
      <p className="text-center font-bold text-gray-600">
        No tienes anuncios creados
      </p>
    </div>
  );
}
