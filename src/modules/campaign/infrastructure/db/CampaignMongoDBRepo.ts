import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { Campaign } from "../../domain/Campaign";
import { ErrorFindingCampaign } from "../../domain/errors/ErrorFindingCampaign";
import { ICampaignRepo } from "../../domain/interfaces/ICampaignRepo";
import { CampaignBudget } from "../../domain/value-objects/Budget";
import { CampaignMetrics } from "../../domain/value-objects/CampaignMetrics";
import {
  CampaignStatus,
  CampaignStatusType,
} from "../../domain/value-objects/CampaignStatus";
import { Clicks } from "../../domain/value-objects/Clicks";
import { CampaignModel, ICampaignModel } from "./CampaignModel";

export class CampaignMongoDBRepo implements ICampaignRepo {
  async save(campaign: Campaign): Promise<void> {
    
    await CampaignModel.create({
      ...campaign.toPrimitives(),
      _id: campaign.id.id,
    } as ICampaignModel);
  }

  async removeByAdId(adId: UniqId): Promise<void> {
    const id = adId.id;
    await CampaignModel.deleteOne({ adId: id } as ICampaignModel);
  }

  async findAllByStatus(status: CampaignStatus): Promise<Campaign[] | null> {
    const campaignModels = await CampaignModel.find<ICampaignModel>({
      status: status.status,
    } as ICampaignModel);
    if (campaignModels.length == 0) return null;
    const campaigns = this.mapToCampaign(campaignModels);
    return campaigns;
  }

  async findAllByAdvertiserId(id: UniqId): Promise<Campaign[] | null> {
    const campaignModels = await CampaignModel.find<ICampaignModel>({
      advertiserId: id.id,
    } as ICampaignModel);
    if (campaignModels.length == 0) return null;
    const campaigns = this.mapToCampaign(campaignModels);
    return campaigns;
  }

  async byId(id: UniqId): Promise<Campaign | null> {
    const campaignModel = await CampaignModel.findById(id.id);
    if (!campaignModel) return null;
    return this.toCampaign(campaignModel);
  }

  async addReferral(params: {
    campaignId: UniqId;
    referralId: UniqId;
  }): Promise<void> {
    const campaignId = params.campaignId.id;
    const campaign = await CampaignModel.findByIdAndUpdate(campaignId, {
      $push: { referrals: campaignId },
    });
    if (!campaign) throw ErrorFindingCampaign.byId(params.campaignId.id);
  }

  async increaseViews(id: UniqId): Promise<void> {
    const campaignFound = await CampaignModel.findOneAndUpdate(
      { _id: id.id, status: CampaignStatusType.ACTIVE },
      {
        $inc: { "metrics.totalViews": 1 },
      }
    );
    if (!campaignFound) throw ErrorFindingCampaign.byActiveStatus(id.id);
  }

  async increaseClicks(id: UniqId): Promise<void> {
    const campaignFound = await CampaignModel.findOneAndUpdate(
      { _id: id.id, status: CampaignStatusType.ACTIVE },
      {
        $inc: { "metrics.totalClicks": 1 },
      }
    );
    if (!campaignFound) throw ErrorFindingCampaign.byActiveStatus(id.id);
  }

  private toCampaign(campaignModel: ICampaignModel): Campaign {
    return new Campaign({
      id: new UniqId(campaignModel._id),
      adId: new UniqId(campaignModel.adId),
      advertiserId: new UniqId(campaignModel.advertiserId),
      referrals: campaignModel.referrals.map(
        (referral) => new UniqId(referral)
      ),
      status: new CampaignStatus(campaignModel.status),
      budget: new CampaignBudget({
        clicks: new Clicks(campaignModel.budget.clicks),
        balance: new Balance(campaignModel.budget.balance),
      }),
      metrics: new CampaignMetrics({
        totalClicks: campaignModel.metrics.totalClicks,
        totalViews: campaignModel.metrics.totalViews,
      }),
    });
  }

  private mapToCampaign(campaignModels: ICampaignModel[]): Campaign[] {
    const campaigns = campaignModels.map((campaignModel) =>
      this.toCampaign(campaignModel)
    );
    return campaigns;
  }
}
