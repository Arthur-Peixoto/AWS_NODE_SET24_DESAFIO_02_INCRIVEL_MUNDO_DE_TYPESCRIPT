import { Request, Response } from 'express'
import { CarsTypeormRepository } from '../../typeorm/repositories/cars-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Car } from '../../typeorm/entities/cars.entity'
import { UpdateCarUseCase } from '@/cars/usecases/update-car.usecase'

export async function updateCarController(req: Request, res: Response) {
  const updateCarUseCase = new UpdateCarUseCase(
    new CarsTypeormRepository(dataSource.getRepository(Car)),
  )
  const { id } = req.params

  const updatedCar = await updateCarUseCase.execute(id, req.body)

  return res.status(201).json(updatedCar)
}
