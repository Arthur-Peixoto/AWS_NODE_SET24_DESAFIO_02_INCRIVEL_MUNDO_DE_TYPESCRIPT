import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { OrderModel } from '../models/orders.model'
import { CarModel } from '@/cars/domain/models/cars.model'
import { ufUnion } from '@/orders/utils/ufUnion'
// import { ClientModel } from '../../clients/models/items.model'

export type CreateOrderProps = {
  id?: string
  cep?: string
  city?: string
  total?: number
  initialDate?: Date
  finalDate?: Date
  cancelDate?: Date
  status?: 'Aberto' | 'Aprovado' | 'Cancelado'
  uf?: ufUnion
  // client: CLientMode
  car: CarModel
}

export type findParams = {
  page?: number | null
  per_page?: number | null
  id?: string | null
  cep?: string | null
  city?: string | null
  total?: number | null
  initialDate?: Date | null
  finalDate?: Date | null
  cancelDate?: Date | null
  status?: 'Aberto' | 'Aprovado' | 'Cancelado' | null
  uf?: ufUnion | null
  customerCpf?: string
}

export type findResults = {
  per_page: number
  page: number
  count: number
  data: OrderModel[]
}

export interface OrdersRepository
  extends RepositoryInterface<OrderModel, CreateOrderProps> {
  findAllAndFilter(params: findParams): Promise<findResults>
  findWithRelations(id: string, ...relations: string[]): Promise<OrderModel>
  findWithCustomer(cpf: string): Promise<OrderModel>
}
