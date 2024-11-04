import { ReadOrdersUseCase } from "@/orders/application/usecases/read-orders-usecase"
import { NextFunction, Request, Response } from "express"
import { OrdersTypeormRepository } from "../../typeorm/repositories/orders-typeorm.repository"
import { dataSource } from "@/common/infraestructure/typeorm"
import { Order } from "../../typeorm/entities/orders.entity"

export async function readOrdersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const readOrdersUseCase = new ReadOrdersUseCase(
      new OrdersTypeormRepository(dataSource.getRepository(Order)),
    )

    const orders = await readOrdersUseCase.execute(req.query)
    if (orders.data.length == 0) return res.status(204).send()

    return res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
}
