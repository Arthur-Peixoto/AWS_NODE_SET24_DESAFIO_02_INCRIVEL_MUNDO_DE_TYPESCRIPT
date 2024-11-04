import { carModelInput } from '@/orders/utils/schemas'
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
  car: carModelInput
  status: 'Aberto' | 'Aprovado' | 'Cancelado'
  uf: ufUnion
}
