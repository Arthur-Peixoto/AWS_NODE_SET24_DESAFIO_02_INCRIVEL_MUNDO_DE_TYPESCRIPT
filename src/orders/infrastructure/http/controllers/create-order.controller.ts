import { NextFunction, Request, Response } from 'express'
import { OrdersTypeormRepository } from '../../typeorm/repositories/orders-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Order } from '../../typeorm/entities/orders.entity'
import { CreateOrderUseCase } from '@/orders/application/usecases/create-order.usecase'
import { CustomersTypeormRepository } from '@/modules/customer/typeorm/repositories/customers.typeorm.repository'
import Customer from '@/modules/customer/typeorm/entities/customer.entity'
import { CarsTypeormRepository } from '@/cars/infraestructure/typeorm/repositories/cars-typeorm.repository'
import { Car } from '@/cars/infraestructure/typeorm/entities/cars.entity'

export async function createOrderController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { carId, customerId } = request.body

    const createOrderUseCase = new CreateOrderUseCase.UseCase(
      new OrdersTypeormRepository(dataSource.getRepository(Order)),
      new CustomersTypeormRepository(dataSource.getRepository(Customer)),
      new CarsTypeormRepository(dataSource.getRepository(Car))
    )

    const order = await createOrderUseCase.execute({
      carId,
      customerId,
    })

    return response.status(201).json(order)
  } catch (err) {
    next(err)
  }
}
