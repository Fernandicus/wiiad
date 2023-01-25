import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdvertiserNavBar } from "./AdvertiserNavBar";

export const NavBar = () => {
  const advertiser = useAdvertiser();

  return advertiser.session ? <AdvertiserNavBar /> : null;
};