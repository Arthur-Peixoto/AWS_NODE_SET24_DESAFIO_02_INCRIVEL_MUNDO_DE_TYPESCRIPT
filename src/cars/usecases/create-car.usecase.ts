import { ItemModel } from '../domain/models/items.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export type CreateCarInput = {
  model: string
  brand: string
  licensePlate: string
  mileage?: number
  year: number
  items: ItemModel[]
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
  items: ItemModel[]
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
    if (carExists) throw new Error('Car already exists')
    const car = this.carRepository.create(input)
    await this.carRepository.insert(car)

    return {
      id: car.id,
      model: car.model,
      brand: car.brand,
      licensePlate: car.licensePlate,
      mileage: car.mileage,
      year: car.year,
      items: car.items,
      price: car.price,
      registrationDate: car.registrationDate,
      status: car.status,
    }
  }
}
