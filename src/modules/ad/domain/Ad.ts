import { AdDescription } from "./value-objects/AdDescription";
import { AdFileUrl } from "./value-objects/AdFileUrl";
import { AdRedirectionUrl } from "./value-objects/AdRedirectionUrl";
import { AdSegments } from "./value-objects/AdSegments";
import { AdTitle } from "./value-objects/AdTitle";
import { UniqId } from "@/src/utils/UniqId";

export interface AdPropsPrimitives {
  id: string;
  advertiserId: string;
  title: string;
  description: string;
  file: string;
  redirectionUrl: string;
  segments: string[];
}

export interface AdProps {
  id: UniqId;
  title: AdTitle;
  description: AdDescription;
  file: AdFileUrl;
  redirectionUrl: AdRedirectionUrl;
  advertiserId: UniqId;
  segments: AdSegments;
}

export class Ad {
  public readonly id: UniqId;
  public readonly advertiserId: UniqId;
  public readonly title: AdTitle;
  public readonly description: AdDescription;
  public readonly file: AdFileUrl;
  public readonly redirectionUrl: AdRedirectionUrl;
  public readonly segments: AdSegments;

  constructor(adProps: AdProps) {
    this.id = adProps.id;
    this.title = adProps.title;
    this.description = adProps.description;
    this.file = adProps.file;
    this.redirectionUrl = adProps.redirectionUrl;
    this.advertiserId = adProps.advertiserId;
    this.segments = adProps.segments;
  }

  toPrimitives(): AdPropsPrimitives {
    return {
      id: this.id.id,
      advertiserId: this.advertiserId.id,
      title: this.title.title,
      description: this.description.description,
      file: this.file.file,
      redirectionUrl: this.redirectionUrl.url,
      segments: this.segments.segments,
    };
  }
}
