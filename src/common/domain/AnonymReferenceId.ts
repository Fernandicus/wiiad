import { AReferenceId } from "@/src/common/domain/interfaces/AReferenceId";

export class AnonymReferenceId<T extends string> extends AReferenceId<T> {
  constructor(private referenceId: AReferenceId<T>) {
    super({ ...referenceId, prefix: "anonym_" });
  }

  value(): string {
    return `anonym_${this.referenceId.value()}`;
  }
}
