import { ItemModel } from '../domain/models/items.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export type UpdateCarInput = {
  model?: string
  brand?: string
  licensePlate?: string
  mileage?: number
  year?: number
  items?: ItemModel[]
  price?: number
  status: 'ativo' | 'inativo'
}

export type UpdateCarOutput = {
  id: string
  model: string
  brand: string
  licensePlate: string
  mileage?: number
  year: number
  items: ItemModel[]
  price: number
  registrationDate: Date
  status: 'ativo' | 'inativo' | 'excluído'
}

export class UpdateCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(id: string, input: UpdateCarInput): Promise<UpdateCarOutput> {
    const carExists = await this.carRepository.findById(id)

    if (!carExists) {
      throw new Error("Car don't exist")
    }

    if (input.licensePlate) {
      const duplicatedCar = this.carRepository.findByLicensePlate(
        input.licensePlate,
      )
      if (duplicatedCar) {
        throw new Error('Invalid license plate!')
      }
    }

    const car = { ...carExists, ...input }

    const updatedCar = this.carRepository.update(car)

    return updatedCar
  }
}
