export class ErrorFindingCampaign extends Error {
  constructor(message: string) {
    super(message);
  }

  static byId(id: string): ErrorFindingCampaign {
    return new ErrorFindingCampaign(
      `The campaign with the id '${id}' doesn't exist`
    );
  }

  static byAdvertiserId(id: string): ErrorFindingCampaign {
    return new ErrorFindingCampaign(
      `The advertiser with id '${id}' doesn't have campaigns`
    );
  }

  static byAllActives(): ErrorFindingCampaign {
    return new ErrorFindingCampaign("There are no active campaigns");
  }
}
