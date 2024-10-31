import { CarModel } from '@/cars/domain/models/cars.model'
import {
  CarsRepository,
  CreateCarProps,
  findParams,
  findResults,
} from '@/cars/domain/repositories/cars.repository'
import { In, Repository } from 'typeorm'
import { Car } from '../entities/cars.entity'

export class CarsTypeormRepository implements CarsRepository {
  constructor(private carsRepository: Repository<Car>) {}
  async findByLicensePlate(licensePlate: string): Promise<CarModel> {
    return await this.carsRepository.findOne({
      where: { licensePlate, status: In(['ativo', 'inativo']) },
    })
  }

  async findAllAndFilter(params: findParams): Promise<findResults> {
    // const {
    //   per_page,
    //   page,
    //   model,
    //   brand,
    //   licensePlateFinalDigits,
    //   mileage,
    //   untilYear,
    //   fromYear,
    //   minPrice,
    //   maxPrice,
    //   items,
    // } = params
    const model: string = params.model
    const [data, count] = await this.carsRepository.findAndCount({
      where: { model },
    })
    return {
      per_page: 0,
      page: 0,
      count: count,
      data,
    }
  }

  create(props: CreateCarProps): CarModel {
    return this.carsRepository.create(props)
  }

  async insert(model: CarModel): Promise<CarModel> {
    return await this.carsRepository.save(model)
  }
  async findById(id: string): Promise<CarModel> {
    return await this.carsRepository.findOne({
      where: { id: id },
      relations: { items: true },
    })
  }
  async update(model: CarModel): Promise<CarModel> {
    return await this.carsRepository.save(model)
  }
  async delete(model: CarModel): Promise<CarModel> {
    return await this.carsRepository.save(model)
  }
}
