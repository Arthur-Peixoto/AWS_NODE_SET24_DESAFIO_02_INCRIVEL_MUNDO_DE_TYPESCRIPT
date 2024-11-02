import { AppError } from '@/common/domain/errors/app-error'
import { CarModel } from '../domain/models/cars.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export type DeleteCarOutput = {
  id: string
  model: string
  brand: string
  licensePlate: string
  mileage?: number
  year: number
  items: string[]
  price: number
  registrationDate: Date
  status: 'ativo' | 'inativo' | 'excluído'
}

export class DeleteCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(id: string): Promise<DeleteCarOutput> {
    const carExists = await this.carRepository.findById(id)

    if (!carExists) {
      throw new AppError("Car don't exist", 404)
    }
    carExists.status = 'excluído'

    const deletedCar = await this.carRepository.delete(carExists)
    const itemsName = deletedCar.items.map((item) => item.name)
    return { ...deletedCar, items: itemsName }
  }
}
