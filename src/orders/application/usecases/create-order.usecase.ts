import { ItemModel } from '@/cars/domain/models/items.model'
import { CarsRepository } from '@/cars/domain/repositories/cars.repository'
import { AppError } from '@/common/domain/errors/app-error'
import { CustomerRepository } from '@/modules/customer/domain/repositories/customer.repository'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'
import { ufUnion } from '@/orders/utils/ufUnion'

/* eslint-disable @typescript-eslint/no-namespace */
export namespace CreateOrderUseCase {
  export type Input = {
    carId: string
    customerId: string
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
    constructor(private orderRepository: OrdersRepository, private customerRepository: CustomerRepository, private carRepository: CarsRepository) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.carId
        || !input.customerId
      ) {
        throw new AppError('Input data not provided or invalid', 400)
      }

      const customerExists = await this.customerRepository.findByID(input.customerId)
      if (!customerExists) throw new AppError('Customer does not exist', 404)

        const carExists = await this.carRepository.findById(input.carId)
        if (!carExists) throw new AppError('Car does not exist', 404)
        
      const existingOrder = await this.orderRepository.findWithCustomer(input.customerId)
      if (existingOrder) throw new AppError('Order already exists', 400)
      
      const status: 'Aberto' | 'Aprovado' | 'Cancelado' = 'Aberto'

      const order = {
        ...input,
        car: {
          ...carExists,
          items: carExists.items.map((item) => {
            return item
          }) as ItemModel[],
        },
        customer: customerExists,
        status: status
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
