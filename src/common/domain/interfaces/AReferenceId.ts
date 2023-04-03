import { UniqId } from "../UniqId";

type TId<T extends string> = T;

type AReferenceIdProps<T extends string> = {
  uniqId: UniqId;
  prefix?: string;
  type: T;
};

export type ReferenceIdProps = { uniqId: UniqId; prefix?: string };

export abstract class AReferenceId<T extends string> {
  readonly type: TId<T>;
  readonly uniqId: UniqId;
  readonly prefix: string;

  constructor({ uniqId, type, prefix = "" }: AReferenceIdProps<T>) {
    this.prefix = prefix;
    this.uniqId = uniqId;
    this.type = type;
  }

  value(): string {
    const pref = this.prefix && this.prefix + "_";
    return pref + this.type + "_" + this.uniqId.id;
  }
}
