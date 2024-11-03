import { CarModel } from '@/cars/domain/models/cars.model'
import { ufUnion } from '@/orders/utils/ufUnion'

export interface OrderModel {
  id: string
  cep: string
  city: string
  total: number
  initialDate: Date
  finalDate: Date
  cancelDate: Date
  // clients: ClientModel[]
  car: CarModel
  status: 'Aberto' | 'Aprovado' | 'Cancelado'
  uf: ufUnion
}
