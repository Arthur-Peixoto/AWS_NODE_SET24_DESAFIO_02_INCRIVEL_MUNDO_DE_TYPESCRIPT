import { CarModel } from '@/cars/domain/models/cars.model'
import {
  CarsRepository,
  CreateCarProps,
  findParams,
  findResults,
} from '@/cars/domain/repositories/cars.repository'
import {
  Between,
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
      page,
      per_page,
      model,
      brand,
      licensePlateFinalDigits,
      mileage,
      untilYear,
      fromYear,
      minPrice,
      maxPrice,
      items,
      status,
    } = params
    const options: FindOptionsWhere<Car> = {}
    if (items) {
      const itemsToFind = [...items]
      options.items = { name: In(itemsToFind) }
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
    if (mileage) options.mileage = LessThanOrEqual(mileage)

    options.status = status ? In([status]) : In(['ativo', 'inativo'])
    let take: number = 0
    let skip: number = 0
    take = per_page ? per_page : 10
    skip = page ? (page - 1) * take : 0

    const [data, count] = await this.carsRepository.findAndCount({
      where: { ...options },
      relations: ['items'],
      skip,
      take,
    })

    if (!data) throw new Error('Car not found')

    const ids = data.map((car) => car.id)
    const cars = await this.carsRepository.find({
      where: { id: In(ids) },
      relations: ['items'],
    })
    return {
      per_page: take,
      page: page ? page : 1,
      count: count,
      data: cars,
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
