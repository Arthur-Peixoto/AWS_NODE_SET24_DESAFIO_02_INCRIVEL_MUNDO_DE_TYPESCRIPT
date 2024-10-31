import { Request, Response } from 'express'
import { CarsTypeormRepository } from '../../typeorm/repositories/cars-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Car } from '../../typeorm/entities/cars.entity'
import { ReadCarUseCase } from '@/cars/usecases/read-car.usecase'

export async function readCarController(req: Request, res: Response) {
  const readCarUseCase = new ReadCarUseCase(
    new CarsTypeormRepository(dataSource.getRepository(Car)),
  )

  const newCar = await readCarUseCase.execute({})

  return res.status(201).json(newCar)
}
