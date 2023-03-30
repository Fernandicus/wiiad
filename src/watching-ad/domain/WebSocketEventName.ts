const all_watching_ad_actions = [
  "start-watching-ad",
  "finish-watching-ad",
] as const;

type TWatchingAdActions = typeof all_watching_ad_actions;

export type TWatchingAdAction = TWatchingAdActions[number];

export class WatchingAdActionName {
  readonly action;

  constructor(value: string) {
    if (!value) throw new Error("Watching Ad Action Name cant be empty");
    this.action = value;
  }

  static action(name: TWatchingAdAction): WatchingAdActionName {
    return new WatchingAdActionName(name);
  }

  static validateFromString(name: string): WatchingAdActionName {
    if (!this.isValidEvent(name))
      throw new Error(`Event name ${name} is not a valid event`);
    return new WatchingAdActionName(name);
  }

  private static isValidEvent(name: string): name is TWatchingAdAction {
    return all_watching_ad_actions.includes(name as TWatchingAdAction);
  }
}
