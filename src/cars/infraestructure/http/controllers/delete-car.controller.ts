import { NextFunction, Request, Response } from 'express'
import { CarsTypeormRepository } from '../../typeorm/repositories/cars-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Car } from '../../typeorm/entities/cars.entity'
import { DeleteCarUseCase } from '@/cars/usecases/delete-car.usecase'
import { OrdersTypeormRepository } from '@/orders/infrastructure/typeorm/repositories/orders-typeorm.repository'
import { Order } from '@/orders/infrastructure/typeorm/entities/orders.entity'

export async function deleteCarController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const deleteCarUseCase = new DeleteCarUseCase(
      new CarsTypeormRepository(dataSource.getRepository(Car)),
      new OrdersTypeormRepository(dataSource.getRepository(Order)),
    )

    const deletedCar = await deleteCarUseCase.execute(id)

    return res.status(200).json(deletedCar)
  } catch (err) {
    next(err)
  }
}
