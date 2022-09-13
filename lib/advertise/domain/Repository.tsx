import { Advertise } from "./Advertise";

export default interface Repository {
  save(model: unknown): Promise<void>;
}
