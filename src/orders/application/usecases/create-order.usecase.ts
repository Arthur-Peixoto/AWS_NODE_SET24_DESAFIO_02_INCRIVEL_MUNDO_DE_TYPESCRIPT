import { ItemModel } from '@/cars/domain/models/items.model'
import { AppError } from '@/common/domain/errors/app-error'
import { CustomerModel } from '@/modules/customer/domain/models/cutomer.model'
import { CustomerRepository } from '@/modules/customer/domain/repositories/customer.repository'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'
import { carModelInput } from '@/orders/utils/schemas'
import { ufUnion } from '@/orders/utils/ufUnion'

/* eslint-disable @typescript-eslint/no-namespace */
export namespace CreateOrderUseCase {
  export type Input = {
    car: carModelInput
    customer: CustomerModel
  }

  export type Output = {
    id: string
    cep: string
    city: string
    total: number
    initialDate: Date
    finalDate: Date
    cancelDate: Date
    customerCpf: string
    carId: string
    status: 'Aberto' | 'Aprovado' | 'Cancelado'
    uf: ufUnion
  }

  export class UseCase {
    constructor(private orderRepository: OrdersRepository, private customerRepository: CustomerRepository) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.car
        || !input.customer
      ) {
        throw new AppError('Input data not provided or invalid', 400)
      }

      const customerExists = await this.customerRepository.findByID(input.customer.id)
      if (!customerExists) throw new AppError('Customer does not exist', 400)
        
      const existingOrder = await this.orderRepository.findWithCustomer(input.customer.id)
      if (existingOrder) throw new AppError('Order already exists', 400)

      const order = {
        ...input,
        car: {
          ...input.car,
          items: input.car.items.map((item) => {
            return { name: item }
          }) as ItemModel[],
        },
        customer: {
          ...input.customer
        }
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
        customerCpf: order.customer.cpf,
        carId: order.car.id,
        status: orderInst.status,
        uf: orderInst.uf,
      }
    }
  }
}
