import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { CarModel } from '../models/cars.model'
import { ItemModel } from '../models/items.model'

export type CreateCarProps = {
  id?: string
  model: string
  brand: string
  licensePlate: string
  year: number
  mileage?: number
  items: ItemModel[]
  registrationDate?: Date
  status: 'ativo' | 'inativo' | 'excluído'
}

export type findParams = {
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

export type findResults = {
  per_page: number
  page: number
  count: number
  data: CarModel[]
}

export interface CarsRepository
  extends RepositoryInterface<CarModel, CreateCarProps> {
  findAllAndFilter(params: findParams): Promise<findResults>
  findByLicensePlate(licensePlate: string): Promise<CarModel>
}
