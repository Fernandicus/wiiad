import { IProfilePageParams } from "@/pages/profile";
import { RoleType } from "@/src/common/domain/Role";
import { assertUnreachable } from "@/src/utils/helpers";
import { AdvertiserProfile } from "./advertiser/AdvertiserProfile";
import { UserProfile } from "./user/UserProfile";

export const UserProfilePage = (props: IProfilePageParams) => {
  const { user } = props;
  const role = user.role as RoleType;

  const roleType = (roleT: RoleType) => {
    switch (roleT) {
      case RoleType.USER:
        return RoleType.USER;
      case RoleType.BUSINESS:
        return RoleType.BUSINESS;
      case RoleType.AGENCY:
        return RoleType.AGENCY;
      default:
        assertUnreachable(roleT);
    }
  };

  const profile: Record<RoleType, JSX.Element | null> = {
    user: <UserProfile user={user} />,
    business: <AdvertiserProfile />,
    agency: null,
  };

  return <section className="w-full">{profile[roleType(role)]}</section>;
};
