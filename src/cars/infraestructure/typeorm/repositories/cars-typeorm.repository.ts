import { CarModel } from '@/cars/domain/models/cars.model'
import {
  CarsRepository,
  CreateCarProps,
  findParams,
  findResults,
} from '@/cars/domain/repositories/cars.repository'
import {
  Between,
  FindOperator,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm'
import { Car } from '../entities/cars.entity'

export class CarsTypeormRepository implements CarsRepository {
  constructor(private carsRepository: Repository<Car>) {}
  async findByLicensePlate(licensePlate: string): Promise<CarModel> {
    return await this.carsRepository.findOne({
      where: { licensePlate, status: In(['ativo', 'inativo']) },
    })
  }

  async findAllAndFilter(params: findParams): Promise<findResults> {
    const {
      //page,
      //per_page,
      model,
      brand,
      licensePlateFinalDigits,
      mileage,
      untilYear,
      fromYear,
      minPrice,
      maxPrice,
      items,
    } = params
    const options: FindOptionsWhere<Car> = {}
    if (items) {
      options.items = In(items.map((item) => item.name))
    }
    if (model) options.model = model
    if (brand) options.brand = brand

    if (untilYear && fromYear) options.year = Between(fromYear, untilYear)
    else if (untilYear) options.year = LessThanOrEqual(untilYear)
    else if (fromYear) options.year = MoreThanOrEqual(fromYear)

    if (minPrice && maxPrice) options.price = Between(minPrice, maxPrice)
    else if (minPrice) options.price = MoreThanOrEqual(minPrice)
    else if (maxPrice) options.price = LessThanOrEqual(maxPrice)

    if (licensePlateFinalDigits)
      options.licensePlate = Like(`%${licensePlateFinalDigits}`)
    if (mileage) options.mileage = options.mileage = LessThanOrEqual(mileage)

    //per_page = per_page ? per_page : 10
    //page = page ? page : 1

    const [data, count] = await this.carsRepository.findAndCount({
      where: { ...options },
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
