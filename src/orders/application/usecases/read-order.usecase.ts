import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'
import { carModelInput } from '@/orders/utils/schemas'
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
  car: carModelInput
  status: 'Aberto' | 'Aprovado' | 'Cancelado'
  uf: ufUnion
}

export class ReadOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute(id: string): Promise<readOutput> {
    const order = await this.orderRepository.findWithRelations(id, 'car')
    console.log(order)
    return order
  }
}
