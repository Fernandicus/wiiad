import { UniqId } from "@/src/utils/UniqId";

export class FakeUniqId extends UniqId {
  constructor(params: string) {
    super(params);
  }

  static noExist(): FakeUniqId {
    return new FakeUniqId("[no-exist]");
  }

  static create(): FakeUniqId {
    return new FakeUniqId(UniqId.generate());
  }

  checkIfNotExsits(): boolean {
    return this.id.includes("[no-exist]");
  }

  static checkIfIdNotExist(id: string): boolean {
    return id.includes("[no-exist]");
  }
}
