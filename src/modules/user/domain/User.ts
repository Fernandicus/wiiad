import { UniqId } from "@/src/utils/UniqId";

export class User {
  readonly id;
  constructor(props: { id: UniqId }) {
    this.id = props.id;
  }
}
