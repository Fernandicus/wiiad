import { updateCampaignMetrics } from "@/src/modules/campaign/infrastructure/campaign-container";
import { findReferral } from "@/src/modules/referrals/infrastructure/referral-container";
import { AddReferralToCampaign } from "../use-case/AddReferralToCampaign";

export const addReferralToCampaign = new AddReferralToCampaign({
  updateCampaign: updateCampaignMetrics,
  findReferral: findReferral,
});
