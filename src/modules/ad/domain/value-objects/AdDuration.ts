import { Integer } from "@/src/common/domain/Integer";

export class AdDuration extends Integer {
  readonly milliseconds;
  readonly dateEnd: Date;
  
  constructor(seconds: number) {
    super(seconds);
    this.milliseconds = seconds * 1000;
    this.dateEnd = new Date(Date.now() + this.milliseconds);
  }

  static defaultTime() {
    return new AdDuration(15);
  }
}
