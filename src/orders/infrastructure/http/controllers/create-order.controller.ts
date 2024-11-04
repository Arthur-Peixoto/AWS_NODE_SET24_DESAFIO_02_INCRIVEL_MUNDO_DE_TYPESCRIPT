import { NextFunction, Request, Response } from 'express'
import { OrdersTypeormRepository } from '../../typeorm/repositories/orders-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Order } from '../../typeorm/entities/orders.entity'
import { CreateOrderUseCase } from '@/orders/application/usecases/create-order.usecase'
import Customer from '@/modules/customer/infraestructure/typeorm/entities/customer.entity'
import { CustomersTypeormRepository } from '@/modules/customer/infraestructure/typeorm/repositories/customers.typeorm.repository'

export async function createOrderController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { car, customer } = request.body

    const createOrderUseCase = new CreateOrderUseCase.UseCase(
      new OrdersTypeormRepository(dataSource.getRepository(Order)),
      new CustomersTypeormRepository(dataSource.getRepository(Customer)),
    )

    const order = await createOrderUseCase.execute({
      car,
      customer,
    })

    return response.status(201).json(order)
  } catch (err) {
    next(err)
  }
}
