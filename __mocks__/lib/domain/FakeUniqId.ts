import { UniqId } from "@/src/common/domain/UniqId";

export class FakeUniqId extends UniqId {
  readonly existis;

  constructor({ uniqId, exists = true }: { uniqId: string; exists?: boolean }) {
    super(uniqId);
    this.existis = exists;
  }

  static noExist(): FakeUniqId {
    return new FakeUniqId({uniqId: UniqId.generate(), exists: false});
  }

  static create(): FakeUniqId {
    return new FakeUniqId({uniqId: UniqId.generate()});
  }

  /*   checkIfNotExsits(): boolean {
    return this.id.includes("[no-exist]");
  }

  static checkIfIdNotExist(id: string): boolean {
    return id.includes("[no-exist]");
  } */
}
