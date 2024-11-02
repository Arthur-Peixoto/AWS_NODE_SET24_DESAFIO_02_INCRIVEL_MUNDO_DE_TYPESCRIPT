import { dataSource } from '@/common/infraestructure/typeorm'
import { ItemModel } from '../domain/models/items.model'
import { CarsRepository } from '../domain/repositories/cars.repository'
import { Item } from '../infraestructure/typeorm/entities/items.entity'
import { AppError } from '@/common/domain/errors/app-error'

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
      throw new AppError("Car don't exist", 404)
    }

    if (carExists.status === 'excluído')
      throw new AppError("Isn't possible to update excluded cars", 403)

    if (licensePlate) {
      const duplicatedCar =
        await this.carRepository.findByLicensePlate(licensePlate)
      if (duplicatedCar && duplicatedCar.id !== carExists.id) {
        throw new AppError('Car already exists!', 409)
      }
    }
    let itemsNames = []
    if (items) {
      const itemsRepository = dataSource.getRepository(Item)
      itemsNames = items.map((item) => {
        let id
        const car = carExists
        if (carExists.items.length > 0) {
          const item = carExists.items.shift()
          id = item.id
        }
        return { name: item, id, car }
      })
      await Promise.all(
        carExists.items.map(async (item) => {
          await itemsRepository.delete({ id: item.id })
        }),
      )
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
