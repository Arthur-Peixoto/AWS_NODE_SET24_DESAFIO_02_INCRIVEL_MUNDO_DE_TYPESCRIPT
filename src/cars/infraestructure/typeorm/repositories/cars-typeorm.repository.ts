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

  async insert(model: CarModel): Promise<CarModel> {
    return await this.carsRepository.save(model)
  }
  async findById(id: string): Promise<CarModel> {
    return await this.carsRepository.findOne({ where: { id: id } })
  }
  async update(model: CarModel): Promise<CarModel> {
    return await this.carsRepository.save(model)
  }
  async delete(id: string): Promise<void> {
    await this.carsRepository.delete(id)
  }

  async findByBrand(brand: string): Promise<CarModel[]> {
    return await this.carsRepository.find({ where: { brand: brand } })
  }
  async findByModel(model: string): Promise<CarModel[]> {
    return await this.carsRepository.find({ where: { model: model } })
  }
  async findByYear(year: number): Promise<CarModel[]> {
    return await this.carsRepository.find({ where: { year: year } })
  }
}
