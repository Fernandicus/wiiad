import { IProfilePageParams } from "@/pages/profile";
import { RoleType } from "@/src/common/domain/Role";
import { AdvertiserProfile } from "./advertiser/AdvertiserProfile";
import { UserProfile } from "./user/UserProfile";

export const UserProfilePage = (props: IProfilePageParams) => {
  const { user } = props;
  const role = user.role as RoleType;
  function assertUnreachable(role: never): never {
    throw new Error("Missing RoleType in switch case");
  }
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
    business: <AdvertiserProfile user={user} />,
    agency: null,
  };

  return (
    <section className="bg-slate-100 w-full h-screen">
      {profile[roleType(role)]}
    </section>
  );
};
