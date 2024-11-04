import { ItemModel } from '@/cars/domain/models/items.model'
import { AppError } from '@/common/domain/errors/app-error'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'
import { carModelInput } from '@/orders/utils/schemas'
import { ufUnion } from '@/orders/utils/ufUnion'

/* eslint-disable @typescript-eslint/no-namespace */
export namespace CreateOrderUseCase {
  export type Input = {
    car: carModelInput
    // client: ClientModel
  }

  export type Output = {
    id: string
    cep: string
    city: string
    total: number
    initialDate: Date
    finalDate: Date
    cancelDate: Date
    // client: ClientModel
    carId: string
    status: 'Aberto' | 'Aprovado' | 'Cancelado'
    uf: ufUnion
  }

  export class UseCase {
    constructor(private orderRepository: OrdersRepository) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.car
        // || !input.client
      ) {
        throw new AppError('Input data not provided or invalid', 400)
      }

      // TODO: check if client exists
      // TODO: check if client already has order

      const order = {
        ...input,
        car: {
          ...input.car,
          items: input.car.items.map((item) => {
            return { name: item }
          }) as ItemModel[],
        },
      }

      const orderInst = this.orderRepository.create(order)
      await this.orderRepository.insert(orderInst)

      return {
        id: orderInst.id,
        cep: orderInst.cep,
        city: orderInst.city,
        total: orderInst.total,
        initialDate: orderInst.initialDate,
        finalDate: orderInst.finalDate,
        cancelDate: orderInst.cancelDate,
        // client: orderInst.client,
        carId: order.car.id,
        status: orderInst.status,
        uf: orderInst.uf,
      }
    }
  }
}
