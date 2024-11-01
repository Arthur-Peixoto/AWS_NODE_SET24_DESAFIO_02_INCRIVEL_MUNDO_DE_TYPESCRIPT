import { Request, Response } from 'express'
import { CarsTypeormRepository } from '../../typeorm/repositories/cars-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Car } from '../../typeorm/entities/cars.entity'
import { DeleteCarUseCase } from '@/cars/usecases/delete-car.usecase'

export async function deleteCarController(req: Request, res: Response) {
  const { id } = req.params
  const deleteCarUseCase = new DeleteCarUseCase(
    new CarsTypeormRepository(dataSource.getRepository(Car)),
  )

  const deletedCar = await deleteCarUseCase.execute(id)

  return res.status(200).json(deletedCar)
}
