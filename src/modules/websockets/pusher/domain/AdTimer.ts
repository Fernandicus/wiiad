import { Integer } from "@/src/common/domain/Integer";

export class AdTimer extends Integer {
  readonly milliseconds;
  constructor(seconds: number) {
    super(seconds);
    this.milliseconds = seconds * 1000;
  }
}
