import { RolType } from "@/src/domain/Rol";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { mockedAdRepo } from "./MockAdTestDB";
import { mockedAdvertiserRepo } from "./MockAdvertiserTestDB";
import { MockCampaignTestDB, mockedCampaignRepo } from "./MockCampaignTestDB";
import { mockedUserRepo } from "./MockUserTestDB";
import {
  mockedVerificationEmailRepo, MockVerificationEmailDB
} from "./MockVerificationEmailDB";

interface InitializedMongoTestDB {
  mock: {
    verificationEmailsDB: MockVerificationEmailDB;
  },
  campaigns: {
    actives: ICampaignPrimitives[];
    finished: ICampaignPrimitives[];
    standBy: ICampaignPrimitives[];
  };
  advertisers: AdvertiserPropsPrimitives[];
  ads: AdPropsPrimitives[];
  users: IUserPrimitives[];
  verificationEmails: {
    expired: IVerificationEmailTimerPrimitives[];
    valids: IVerificationEmailTimerPrimitives[];
  };
}

export class MockTestDB {
  static async setAndInitAll(): Promise<InitializedMongoTestDB> {
    const totalAds = 9;

    const mockedAdDB = await mockedAdRepo(totalAds);
    const mockedAds = await mockedAdDB.getAllAds();

    const mockedAdvertisers = await mockedAdvertiserRepo();
    const advertisers = await mockedAdvertisers.getAllAdvertisers();

    const mockedCampaigns = await mockedCampaignRepo({
      activeAds: mockedAds!.slice(0, 3),
      finishedAds: mockedAds!.slice(3, 6),
      standByAds: mockedAds!.slice(6, 9),
    });
    const campaigns = await this.findCampaignsByStatus(mockedCampaigns);

    const mockedUsers = await mockedUserRepo(3);
    const users = await mockedUsers.getAll();

    const mockedVerificationEmails = await mockedVerificationEmailRepo(2, 4);
    const verificationEmails = await mockedVerificationEmails.getAll();

    return {
      mock:{
        verificationEmailsDB: mockedVerificationEmails,
      },
      campaigns: {
        actives: campaigns.actives!,
        finished: campaigns.finished!,
        standBy: campaigns.standBy!,
      },
      advertisers: advertisers!,
      ads: mockedAds!,
      users: users!,
      verificationEmails: {
        expired: verificationEmails!.expired,
        valids: verificationEmails!.valid,
      },
    };
  }

  private static async findCampaignsByStatus(
    mockedCampaigns: MockCampaignTestDB
  ): Promise<{
    actives: ICampaignPrimitives[] | null;
    finished: ICampaignPrimitives[] | null;
    standBy: ICampaignPrimitives[] | null;
  }> {
    const actives = await mockedCampaigns.findByStatus(
      CampaignStatusType.ACTIVE
    );
    const finished = await mockedCampaigns.findByStatus(
      CampaignStatusType.FINISHED
    );
    const standBy = await mockedCampaigns.findByStatus(
      CampaignStatusType.STAND_BY
    );
    return { actives, finished, standBy };
  }
}
