
export interface Repository {
  save(model: unknown): Promise<void>;
}
