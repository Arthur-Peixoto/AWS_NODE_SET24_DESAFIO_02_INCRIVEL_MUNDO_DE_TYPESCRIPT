import { ReadOrderUseCase } from '@/orders/application/usecases/read-order.usecase'
import { NextFunction, Request, Response } from 'express'
import { OrdersTypeormRepository } from '../../typeorm/repositories/orders-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Order } from '../../typeorm/entities/orders.entity'

export async function readOrderController(req: Request, res: Response, next: NextFunction) {
  {
    try {
      const { id } = req.params

    const readOrderUseCase = new ReadOrderUseCase(
      new OrdersTypeormRepository(dataSource.getRepository(Order)),
    )

    const order = await readOrderUseCase.execute(id)
    return res.status(200).json(order)
    } catch (err) {
      next(err)
    }
    
  }
}
