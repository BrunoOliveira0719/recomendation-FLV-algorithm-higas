export interface CrudService<T, C, U> {
  create(dto: C): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, dto: U): Promise<T>;
  remove(id: string): Promise<void>;
}
