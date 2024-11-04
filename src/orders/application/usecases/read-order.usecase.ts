import { AppError } from '@/common/domain/errors/app-error'
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

  async execute(id: string): Promise<readOutput |null> {
    const order = await this.orderRepository.findById(id)
    if (!order) throw new AppError('Order does not exist', 400)
    return order
  }
}
