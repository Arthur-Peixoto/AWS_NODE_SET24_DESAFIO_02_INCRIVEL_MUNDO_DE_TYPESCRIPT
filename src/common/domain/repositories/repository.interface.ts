export type CreateProps = {
  id?: string
  licensePlate: string
  brand: string
  model: string
  mileage?: number
  //items: ItemModel[],
  price: number
  registrarionDate?: Date
  status: 'ativo' | 'inativo' | 'excluído'
}

export interface RepositoryInterface<Model, CreateProps> {
  create(props: CreateProps): Model
  insert(model: Model): Promise<Model>
  findById(id: string): Promise<Model>
  update(model: Model): Promise<Model>
  delete(id: string): Promise<void>
}
