export interface Repository {
  save(model: unknown): Promise<string>;
  findAllByAdvertiserId(id: string): Promise<unknown[]>;
}
