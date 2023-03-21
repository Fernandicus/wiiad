type Query = Partial<{
  [key: string]: string | string[];
}>;

export class EventQuery {
  readonly event: string;

  constructor(query: Query) {
    const event = query["event"];
    this.event = this.getQuery(event);
  }

  private getQuery(query: string | string[] | undefined): string {
    if (query instanceof Array) return query[0] ?? "";
    else return query ?? "";
  }
}
