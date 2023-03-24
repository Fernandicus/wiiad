import { UniqId } from "@/src/utils/UniqId";
import { ErrorFindingReferral } from "../../modules/referrals/domain/errors/ErrorFindingReferral";
import { IReferralRepo } from "../../modules/referrals/domain/interfaces/IReferralRepo";
import { ICampaignRepo } from "../../modules/campaign/domain/interfaces/ICampaignRepo";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";
import { UpdateCampaignData } from "@/src/modules/campaign/use-case/UpdateCampaignData";

type TAddReferralToCampaignGivenRefereeId = {
  refereeId: UniqId;
  campaignId: UniqId;
};

export type TAddReferralToCampaignProps = {
  updateCampaign: UpdateCampaignData;
  findReferral: FindReferral;
};

export class AddReferralToCampaign {
  private updateCampaign;
  private findReferral;

  constructor({ updateCampaign, findReferral }: TAddReferralToCampaignProps) {
    this.updateCampaign = updateCampaign;
    this.findReferral = findReferral;
  }

  async givenRefereeId({
    campaignId,
    refereeId,
  }: TAddReferralToCampaignGivenRefereeId): Promise<void> {
    const referral = await this.findReferral.findByUserId(refereeId);
    await referral.match({
      some: async (referralFound) => {
        await this.updateCampaign.addReferral({
          campaignId: campaignId,
          referralId: referralFound.id,
        });
      },
      nothing() {
        throw ErrorFindingReferral.byUserId(refereeId.id);
      },
    });
  }
}
