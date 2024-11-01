import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { OrderModel } from '../models/orders.model'
import { CarModel } from '@/cars/domain/models/cars.model'
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
    uf?: 'AC' | 'AL' | 'AM' | 'AP' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MG' | 'MS' | 'MT' | 'PA' | 'PB' | 'PE' | 'PI' | 'PR' | 'RJ' | 'RN' | 'RO' | 'RR' | 'RS' | 'SC' | 'SE' | 'SP' | 'TO'
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
  uf?: 'AC' | 'AL' | 'AM' | 'AP' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MG' | 'MS' | 'MT' | 'PA' | 'PB' | 'PE' | 'PI' | 'PR' | 'RJ' | 'RN' | 'RO' | 'RR' | 'RS' | 'SC' | 'SE' | 'SP' | 'TO' | null
  // client?: CLientModel
  car?: CarModel
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
}
