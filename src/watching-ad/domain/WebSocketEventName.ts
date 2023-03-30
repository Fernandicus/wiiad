const all_watching_ad_actions = [
  "start-watching-ad",
  "finish-watching-ad",
] as const;

type TWatchingAdActions = typeof all_watching_ad_actions;

export type TWatchingAdAction = TWatchingAdActions[number];

export class WatchingAdActionName {
  readonly event;

  private constructor(value: string) {
    if (!value.includes("event::"))
      throw new Error("Event Name must be start with 'event::'");
    this.event = value;
  }

  static event(name: TWatchingAdAction) {
    return WatchingAdActionName.fromString(name);
  }

  static fromString(name: string) {
    return new WatchingAdActionName("event::" + name);
  }

  static validateFromString(name: string) {
    if (!this.isValidEvent(name))
      throw new Error(`Event name ${name} is not a valid event`);
    return WatchingAdActionName.event(name);
  }

  private static isValidEvent(name: string): name is TWatchingAdAction {
    return all_watching_ad_actions.includes(name as TWatchingAdAction);
  }

  getName() {
    return this.event.split("event::")[1];
  }
}
