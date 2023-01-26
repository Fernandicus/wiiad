export class ErrorRemovingCampaign extends Error {
  constructor(message: string, cause?: string) {
    super(message, { cause });
  }
}
