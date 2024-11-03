import { CarModel } from '@/cars/domain/models/cars.model'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'
import { ufUnion } from '@/orders/utils/ufUnion'

export type readOutput = {
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

export class ReadOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute(id: string): Promise<readOutput> {
    const order = await this.orderRepository.findById(id)

    return order
  }
}
