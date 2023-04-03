import { Query } from "@/src/common/domain/types/types";

export class ActionQuery {
  readonly action: string;

  constructor(query: Query) {
    const action = query["action"];
    this.action = this.getQuery(action);
  }

  private getQuery(query: string | string[] | undefined): string {
    if (query instanceof Array) return query[0] ?? "";
    else return query ?? "";
  }
}
