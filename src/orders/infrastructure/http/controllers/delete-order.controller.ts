import { NextFunction, Request, Response } from 'express'
import { dataSource } from '@/common/infraestructure/typeorm'
import { DeleteOrderUseCase } from '@/orders/application/usecases/delete-order.usecase'
import { OrdersTypeormRepository } from '../../typeorm/entities/repositories/orders-typeorm.repository'
import { Order } from '../../typeorm/entities/entities/orders.entity'

export async function deleteOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const deleteOrderUseCase = new DeleteOrderUseCase(
      new OrdersTypeormRepository(dataSource.getRepository(Order)),
    )

    await deleteOrderUseCase.execute(id)

    return res.status(201).send()
  } catch (err) {
    next(err)
  }
}
