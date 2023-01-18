import { RoleType } from "@/src/common/domain/Role";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { AdvertiserHeader } from "./advertiser/AdvertiserHeader";
import { UserProfile } from "./user/UserProfile";

interface IProfileSectionParams {
  userData: IUserPrimitives;
  ads?: AdPropsPrimitives[]; // | null;
  campaigns?: ICampaignPrimitives[]; // | null;
}

export const UserProfileSection = (props: IProfileSectionParams) => {
  const { ads, campaigns, userData } = props;
  const role = userData.role as RoleType;
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
    user: <UserProfile user={userData} />,
    business: !ads ? null : (
      <AdvertiserHeader
        user={userData}
        totalAds={ads!.length}
        totalCampaigns={campaigns!.length}
      />
    ),
    agency: null,
  };

  return profile[roleType(role)];
};
