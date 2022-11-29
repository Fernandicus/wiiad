import { TimerConstants } from "./TimerConstants";

export class ExpirationDate {
  readonly date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  static inFiveMinutes(): ExpirationDate {
    return new ExpirationDate(new Date(Date.now() + TimerConstants.fiveMin));
  }
}
