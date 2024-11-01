import { ItemModel } from '../domain/models/items.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export type UpdateCarInput = {
  model?: string
  brand?: string
  licensePlate?: string
  mileage?: number
  year?: number
  items?: string[]
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
  items: string[]
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
    let itemsNames = []
    if (items) {
      itemsNames = items.map((item) => {
        let id
        let car
        if (carExists.items.length > 0) {
          const item = carExists.items.pop()
          id = item.id
          car = item.car
        } else {
          car = carExists
        }
        return { name: item, id, car }
      })
    }
    const car = {
      id: carExists.id,
      registrationDate: carExists.registrationDate,
      model: !model ? carExists.model : model,
      brand: !brand ? carExists.brand : brand,
      mileage: !mileage ? carExists.mileage : mileage,
      year: !year ? carExists.year : year,
      price: !price ? carExists.price : price,
      status: !status ? carExists.status : status,
      items: !items ? carExists.items : (itemsNames as ItemModel[]),
      licensePlate: !licensePlate ? carExists.licensePlate : licensePlate,
    }

    const updatedCar = await this.carRepository.update(car)
    itemsNames = updatedCar.items.map((item) => item.name)

    return { ...updatedCar, items: itemsNames }
  }
}
