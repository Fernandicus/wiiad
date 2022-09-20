export interface Repository {
  save(model: unknown): Promise<void>;
  findAllByAdvertiserId(id: string): Promise<unknown[]>;
  remove(id: string): Promise<void>;
}
