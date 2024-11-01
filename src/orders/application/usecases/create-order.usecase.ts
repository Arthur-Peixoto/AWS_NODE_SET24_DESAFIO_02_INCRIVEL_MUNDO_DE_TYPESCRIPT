import { CarModel } from '@/cars/domain/models/cars.model'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'

/* eslint-disable @typescript-eslint/no-namespace */
export namespace CreateOrderUseCase {
  export type Input = {
    car: CarModel
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

  export class UseCase {
    constructor(private orderRepository: OrdersRepository) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.car
        // || !input.client
      ) {
        // Error type BadRequestError
        throw new Error('Input data not provided or invalid')
      }

      // TODO: check if client exists
      // TODO: check if Order already exists

      const order = this.orderRepository.create(input)
      await this.orderRepository.insert(order)

      return {
        id: order.id,
        cep: order.cep,
        city: order.city,
        total: order.total,
        initialDate: order.initialDate,
        finalDate: order.finalDate,
        cancelDate: order.cancelDate,
        // client: order.client,
        car: order.car,
        status: order.status,
        uf: order.uf,
      }
    }
  }
}
