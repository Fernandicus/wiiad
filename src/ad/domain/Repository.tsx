export interface Repository {
  save(model: unknown): Promise<string>;
  findById(id: string): Promise<unknown>;
}
