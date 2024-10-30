import { CarModel } from '../domain/models/cars.model'
import { ItemModel } from '../domain/models/items.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export class DeleteCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(id: string): Promise<CarModel> {
    const carExists = await this.carRepository.findById(id)

    if (!carExists) {
      throw new Error("Car don't exist")
    }

    await this.carRepository.delete(id)

    return carExists
  }
}
