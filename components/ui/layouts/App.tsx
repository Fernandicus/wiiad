import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { useAccount } from "@/components/hooks/useAccount";
import { RoleType } from "@/src/common/domain/Role";
import { AdvertiserNavBar } from "./AdvertiserNavBar";
import { UserNavBar } from "./UserNavBar";

export const NavBar = () => {
  const {session} = useAccount();

  return (
    <> {session.role === RoleType.BUSINESS ? <AdvertiserNavBar /> : <UserNavBar />}</>
  );
};
