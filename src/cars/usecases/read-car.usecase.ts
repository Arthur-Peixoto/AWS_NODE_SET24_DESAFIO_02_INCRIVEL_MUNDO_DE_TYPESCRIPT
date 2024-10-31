import { CarModel } from '../domain/models/cars.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export class DeleteCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(id: string): Promise<CarModel> {
    const car = await this.carRepository.findById(id)
    return car
  }
}
