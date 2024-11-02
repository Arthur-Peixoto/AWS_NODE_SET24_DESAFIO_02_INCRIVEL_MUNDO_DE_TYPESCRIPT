import { CreateCarUseCase } from '@/cars/usecases/create-car.usecase'
import { NextFunction, Request, Response } from 'express'
import { CarsTypeormRepository } from '../../typeorm/repositories/cars-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Car } from '../../typeorm/entities/cars.entity'

export async function createCarController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { model, brand, year, mileage, status, licensePlate, items, price } =
      req.body

    const createCarUseCase = new CreateCarUseCase(
      new CarsTypeormRepository(dataSource.getRepository(Car)),
    )
    const newCar = await createCarUseCase.execute({
      model,
      brand,
      year,
      mileage,
      status,
      licensePlate,
      items,
      price,
    })

    return res.status(201).json(newCar)
  } catch (err) {
    next(err)
  }
}
