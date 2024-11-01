import { CarsRepository } from '../domain/repositories/cars.repository'

export type readCarOutput = {
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

export class ReadCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(id: string): Promise<readCarOutput> {
    const car = await this.carRepository.findById(id)
    const itemsName = car.items.map((item) => item.name)
    return { ...car, items: itemsName }
  }
}
