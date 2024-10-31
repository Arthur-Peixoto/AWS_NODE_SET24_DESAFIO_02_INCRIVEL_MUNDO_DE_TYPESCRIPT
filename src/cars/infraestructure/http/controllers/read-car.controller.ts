import { Request, Response } from 'express'
import { CarsTypeormRepository } from '../../typeorm/repositories/cars-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Car } from '../../typeorm/entities/cars.entity'
import { ReadCarUseCase } from '@/cars/usecases/read-car.usecase'

export async function readCarController(req: Request, res: Response) {
  const { id } = req.params

  const readCarUseCase = new ReadCarUseCase(
    new CarsTypeormRepository(dataSource.getRepository(Car)),
  )

  const car = await readCarUseCase.execute(id)

  if (!car) throw new Error("Car don't exist!")

  return res.status(200).json(car)
}
