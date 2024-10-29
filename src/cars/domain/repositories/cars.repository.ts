import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { CarModel } from '../models/cars.model'

export type CreateCarProps = {
  id?: string
  model: string
  brand: string
  licensePlate: string
  year: number
  mileage?: number
  items: string[]
  registrationDate?: Date
  status: 'ativo' | 'inativo' | 'excluído'
}

export interface CarsRepository
  extends RepositoryInterface<CarModel, CreateCarProps> {
  findByBrand(brand: string): Promise<CarModel[]>
  findByModel(model: string): Promise<CarModel[]>
  findByYear(year: number): Promise<CarModel[]>
}
