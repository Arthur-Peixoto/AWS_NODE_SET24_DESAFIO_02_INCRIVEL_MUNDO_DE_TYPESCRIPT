import { AppError } from '@/common/domain/errors/app-error'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute(id: string): Promise<void> {
    const orderExists = await this.orderRepository.findById(id)

    if (!orderExists) {
      throw new AppError("Order does not exist", 404)
    }

    if (orderExists.status !== 'Aberto') {
      throw new AppError("Order is not open", 400)
    }

    orderExists.status = 'Cancelado'

    await this.orderRepository.update(orderExists)
  }
}
