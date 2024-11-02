import { NextFunction, Request, Response } from 'express'
import { dataSource } from '@/common/infraestructure/typeorm'
import { OrdersTypeormRepository } from '../../typeorm/entities/repositories/orders-typeorm.repository'
import { UpdateOrderUseCase } from '@/orders/application/usecases/update-order.usecase'
import { Order } from '../../typeorm/entities/entities/orders.entity'

export async function updateOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const updateOrderUseCase = new UpdateOrderUseCase(
      new OrdersTypeormRepository(dataSource.getRepository(Order)),
    )
    const { id } = req.params

    await updateOrderUseCase.execute(id, req.body)

    return res.status(201).send()
  } catch (err) {
    next(err)
  }
}
