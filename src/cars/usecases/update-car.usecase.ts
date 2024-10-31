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
  status?: 'ativo' | 'inativo' | 'excluído'
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

  async execute(
    id: string,
    {
      model,
      brand,
      year,
      licensePlate,
      items,
      status,
      mileage,
      price,
    }: UpdateCarInput,
  ): Promise<UpdateCarOutput> {
    const carExists = await this.carRepository.findById(id)

    if (!carExists) {
      throw new Error("Car don't exist")
    }

    if (carExists.status === 'excluído')
      throw new Error("Isn't possible to update excluded cars")

    if (status === 'excluído')
      throw new Error("Isn't possible to update status to 'excluído'")

    if (licensePlate) {
      const duplicatedCar =
        await this.carRepository.findByLicensePlate(licensePlate)
      if (duplicatedCar && duplicatedCar.id !== carExists.id) {
        throw new Error('Invalid license plate!')
      }
    }

    const car = {
      id: carExists.id,
      registrationDate: carExists.registrationDate,
      model: model === undefined ? carExists.model : model,
      brand: brand === undefined ? carExists.brand : brand,
      mileage: mileage === undefined ? carExists.mileage : mileage,
      year: year === undefined ? carExists.year : year,
      price: price === undefined ? carExists.price : price,
      status: status === undefined ? carExists.status : status,
      items: items === undefined ? carExists.items : items,
      licensePlate:
        licensePlate === undefined ? carExists.licensePlate : licensePlate,
    }

    const updatedCar = this.carRepository.update(car)

    return updatedCar
  }
}
