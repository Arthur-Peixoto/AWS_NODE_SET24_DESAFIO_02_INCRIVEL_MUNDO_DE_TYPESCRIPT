import { CarModel } from '@/cars/domain/models/cars.model'
import { AppError } from '@/common/domain/errors/app-error'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'

export type DeleteCarOutput = {
    id: string
    cep: string
    city: string
    total: number
    initialDate: Date
    finalDate: Date
    cancelDate: Date
    // client: ClientModel
    car: CarModel
    status: 'Aberto' | 'Aprovado' | 'Cancelado'
    uf:
      | 'AC'
      | 'AL'
      | 'AM'
      | 'AP'
      | 'BA'
      | 'CE'
      | 'DF'
      | 'ES'
      | 'GO'
      | 'MA'
      | 'MG'
      | 'MS'
      | 'MT'
      | 'PA'
      | 'PB'
      | 'PE'
      | 'PI'
      | 'PR'
      | 'RJ'
      | 'RN'
      | 'RO'
      | 'RR'
      | 'RS'
      | 'SC'
      | 'SE'
      | 'SP'
      | 'TO'
}

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute(id: string): Promise<DeleteCarOutput> {
    const orderExists = await this.orderRepository.findById(id)

    if (!orderExists) {
      throw new AppError("Order doesn't exist", 404)
    }

    const deletedOrder = await this.orderRepository.delete(orderExists)
    return deletedOrder
  }
}
