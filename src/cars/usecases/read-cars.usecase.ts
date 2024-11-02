import { CarsRepository } from '../domain/repositories/cars.repository'
import { readOutput } from './read-car.usecase'

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
  data: readOutput[]
}

export class ReadCarsUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(input: readCarsInput): Promise<readCarsOutput> {
    const searchResults = await this.carRepository.findAllAndFilter(input)
    const returnedData: readOutput[] = []
    searchResults.data.map((car) => {
      const itemsNames = car.items.map((item) => item.name)
      returnedData.push({ ...car, items: itemsNames })
    })
    return { ...searchResults, data: returnedData }
  }
}
