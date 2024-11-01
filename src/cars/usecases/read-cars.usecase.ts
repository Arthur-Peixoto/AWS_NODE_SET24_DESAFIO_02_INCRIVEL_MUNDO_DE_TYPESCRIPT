import { CarModel } from '../domain/models/cars.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export type readCarsInput = {
  page?: number
  per_page?: number
  model?: string
  brand?: string
  licensePlateFinalDigits?: string
  mileage?: number
  untilYear?: number
  fromYear?: number
  minPrice?: number
  maxPrice?: number
  items?: string[]
}

export type readCarsOutput = {
  per_page: number
  page: number
  count: number
  data: CarModel[]
}

export class ReadCarsUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(input: readCarsInput): Promise<readCarsOutput> {
    // verificar placa e status --> não permite carro com placa igual e status = ativo

    const searchResults = await this.carRepository.findAllAndFilter(input)

    return searchResults
  }
}
