export interface RepositoryInterface<Model, CreateProps> {
  create(props: CreateProps): Model
  insert(model: Model): Promise<Model>
  findById(id: string): Promise<Model>
  update(model: Model): Promise<Model>
  delete(id: string): Promise<void>
}
