export class ErrorWatchingCampaign extends Error {
    readonly info;
    constructor(info: string, errorMessage?: string) {
      super(errorMessage);
      this.info = info;
    }

    static referrerDoesNotExist(referrerName:string):ErrorWatchingCampaign{
      return new ErrorWatchingCampaign(`Referrer ${referrerName} does not exist`)
    }
  }
  