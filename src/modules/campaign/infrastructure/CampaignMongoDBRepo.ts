import { ICampaignPrimitives } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";

export class CampaignMongoDBRepo implements ICampaignRepo{
    async launch(campaign: ICampaignPrimitives): Promise<void> {
        throw new Error("Method not implemented.");
    }
}