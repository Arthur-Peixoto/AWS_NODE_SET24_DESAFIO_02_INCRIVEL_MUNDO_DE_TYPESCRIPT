import { CarModel } from '../domain/models/cars.model'
import { ItemModel } from '../domain/models/items.model'
import { CarsRepository } from '../domain/repositories/cars.repository'

export type readCarInput = {
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
  items?: ItemModel[]
}

export type readCarOutput = {
  per_page: number
  page: number
  count: number
  data: CarModel[]
}

export class ReadCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(input: readCarInput): Promise<readCarOutput> {
    // verificar placa e status --> não permite carro com placa igual e status = ativo
    const searchResults = await this.carRepository.findAllAndFilter(input)

    return searchResults
  }
}
