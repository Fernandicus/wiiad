import { ErrorCreatingAd } from "../ErrorCreatingAd";

export enum AdSegmentType {
  HEALTH = "health",
  FOOD = "food",
  FINANCIAL = "financial",
}

export class AdSegments {
  public readonly segments;

  constructor(segmentsArray: string[]) {
    if (segmentsArray.length == 0)
      throw new ErrorCreatingAd("Ad Segment is mandatory");

    this.segments = segmentsArray.map((segment) => {
      switch (segment) {
        case AdSegmentType.FINANCIAL:
          return AdSegmentType.FINANCIAL;
        case AdSegmentType.FOOD:
          return AdSegmentType.FOOD;
        case AdSegmentType.HEALTH:
          return AdSegmentType.HEALTH;
        default:
          throw new ErrorCreatingAd("Ad Segment do not exist");
      }
    });
  }
}
