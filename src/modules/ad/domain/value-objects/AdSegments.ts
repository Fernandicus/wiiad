
export enum AdSegmentType {
  HEALTH = "health",
  FOOD = "food",
  FINANCIAL = "financial",
  TECH = "tech",
  CRYPTO = "crypto",
  SPORT = "sport",
  GAMES = "games"
}

export class AdSegments {
  public readonly segments: string[] = [];

  private constructor(segmentsArray: string[]) {
    if (segmentsArray.length == 0)
      throw new Error("Ad Segment is mandatory");
    this.segments = segmentsArray;
  }

  static filterByAvailables(segmentsArray: string[]): AdSegments {
    const filteredSegments: string[] = [];

    const setSegments = this.getFilteredSegments(segmentsArray);
    const adSegmentValues = this.getAdSegmentValues();
    setSegments.forEach((segment) => {
      if (adSegmentValues.includes(segment)) filteredSegments.push(segment);
    });

    return new AdSegments(filteredSegments);
  }

  static withAllAvailables(): AdSegments {
    const values = Object.values(AdSegmentType);
    return new AdSegments(values);
  }

  private static getFilteredSegments(segmentsArray: string[]): Set<string> {
    const lowerCaseSegments = this.segmentsToLowerCase(segmentsArray);
    const setSegments = new Set(lowerCaseSegments);
    return setSegments;
  }

  private static getAdSegmentValues(): string[] {
    return Object.values(AdSegmentType).map((value) => value.toLowerCase());
  }

  private static segmentsToLowerCase(segments: string[]): string[] {
    return segments.map((segment) => segment.toLowerCase());
  }
}
