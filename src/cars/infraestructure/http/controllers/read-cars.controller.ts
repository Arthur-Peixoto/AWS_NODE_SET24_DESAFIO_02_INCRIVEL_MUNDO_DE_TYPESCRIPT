import { NextFunction, Request, Response } from 'express'
import { CarsTypeormRepository } from '../../typeorm/repositories/cars-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Car } from '../../typeorm/entities/cars.entity'
import { ReadCarsUseCase } from '@/cars/usecases/read-cars.usecase'

export async function readCarsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const readCarsUseCase = new ReadCarsUseCase(
      new CarsTypeormRepository(dataSource.getRepository(Car)),
    )

    const cars = await readCarsUseCase.execute(req.query)

    return res.status(200).json(cars)
  } catch (err) {
    next(err)
  }
}
