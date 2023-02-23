import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { Logout } from "../login/Logout";
import { AdvertiserNavBar } from "./AdvertiserNavBar";
import { UserNavBar } from "./UserNavBar";

export const NavBar = () => {
  const advertiser = useAdvertiser();

  return (
    <> {advertiser.session.id !== "" ? <AdvertiserNavBar /> : <UserNavBar />}</>
  );
};
