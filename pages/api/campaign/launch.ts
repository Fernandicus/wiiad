import { AdvertiserId } from "@/src/modules/advertiser/domain/value-objects/AdvertiserId";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { CampaignId } from "@/src/modules/campaign/domain/value-objects/CampaignId";
import { CampaignMetrics } from "@/src/modules/campaign/domain/value-objects/CampaignMetrics";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { CampaignMongoDBRepo } from "@/src/modules/campaign/infrastructure/CampaignMongoDBRepo";
import { CreateCampaign } from "@/src/modules/campaign/use-case/CreateCampaign";
import { User } from "@/src/modules/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).json({});

  const adId = req.body.adId;
  if (!adId) return res.status(400).json({ message: "Missing ad id" });

  const campaignRepo = new CampaignMongoDBRepo();
  const createCampaign = new CreateCampaign(campaignRepo);

  const campaign = new Campaign({
    id: new CampaignId(UniqId.generate()),
    advertiserId: new AdvertiserId(UniqId.generate()),
    adId: UniqId.new(),
    promoters: [UniqId.new()],
    watchers: [UniqId.new()],
    status: CampaignStatusType.STAND_BY,
    budget: new CampaignBudget({
      moneyToSpend: 5,
      maxClicks: 5,
    }),
    metrics: new CampaignMetrics({
      totalViews: 3,
      totalClicks: 10,
    }),
  });

  await createCampaign.launch(campaign);

  try {
    return res.status(200).json({});
  } catch (err) {
    return res.status(400).json({});
  }
}
