import { Request, Response } from 'express'
import { CarsTypeormRepository } from '../../typeorm/repositories/cars-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Car } from '../../typeorm/entities/cars.entity'
import { ReadCarsUseCase } from '@/cars/usecases/read-cars.usecase'

export async function readCarsController(req: Request, res: Response) {
  const readCarsUseCase = new ReadCarsUseCase(
    new CarsTypeormRepository(dataSource.getRepository(Car)),
  )

  const cars = await readCarsUseCase.execute({})

  return res.status(200).json(cars)
}
