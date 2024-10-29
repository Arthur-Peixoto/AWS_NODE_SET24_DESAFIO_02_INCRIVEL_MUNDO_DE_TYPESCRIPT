import { CarModel } from '@/cars/domain/models/cars.model'
import {
  CarsRepository,
  CreateCarProps,
} from '@/cars/domain/repositories/cars.repository'
import { Repository } from 'typeorm'
import { Car } from '../entities/cars.entity'

export class CarsTypeormRepository implements CarsRepository {
  constructor(private carsRepository: Repository<Car>) {}

  create(props: CreateCarProps): CarModel {
    return this.carsRepository.create(props)
  }
  insert(model: CarModel): Promise<CarModel> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<CarModel> {
    throw new Error('Method not implemented.')
  }
  update(model: CarModel): Promise<CarModel> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findByBrand(brand: string): Promise<CarModel[]> {
    throw new Error('Method not implemented.')
  }
  findByModel(model: string): Promise<CarModel[]> {
    throw new Error('Method not implemented.')
  }
  findByYear(year: number): Promise<CarModel[]> {
    throw new Error('Method not implemented.')
  }
}
