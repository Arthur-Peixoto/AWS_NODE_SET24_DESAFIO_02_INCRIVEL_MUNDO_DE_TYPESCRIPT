import { AppError } from '@/common/domain/errors/app-error'
import { ItemModel } from '../domain/models/items.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export type CreateCarInput = {
  model: string
  brand: string
  licensePlate: string
  mileage?: number
  year: number
  items: string[]
  price: number
  status: 'ativo' | 'inativo' | 'excluído'
}

export type CreateCarOutput = {
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

export class CreateCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(input: CreateCarInput): Promise<CreateCarOutput> {
    // verificar placa e status --> não permite carro com placa igual e status = ativo
    const carExists = await this.carRepository.findByLicensePlate(
      input.licensePlate,
    )
    if (carExists) throw new AppError('Car already exists', 409)

    const car = {
      ...input,
      items: input.items.map((item) => {
        return { name: item }
      }) as ItemModel[],
    }

    const carInst = this.carRepository.create(car)
    await this.carRepository.insert(carInst)

    return {
      id: carInst.id,
      model: car.model,
      brand: car.brand,
      licensePlate: car.licensePlate,
      mileage: car.mileage,
      year: car.year,
      items: input.items,
      price: car.price,
      registrationDate: carInst.registrationDate,
      status: car.status,
    }
  }
}
