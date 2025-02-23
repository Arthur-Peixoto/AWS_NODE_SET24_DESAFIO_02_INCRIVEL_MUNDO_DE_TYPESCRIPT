// TODO: Configurar retorno de erros da aplicação

import { OrderModel } from '@/orders/domain/models/orders.model'
import {
  OrdersRepository,
  CreateOrderProps,
  findParams,
  findResults,
} from '@/orders/domain/repositories/orders.repository'
import {
  Between,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm'
import { Order } from '../entities/orders.entity'
import { AppError } from '@/common/domain/errors/app-error'

export class OrdersTypeormRepository implements OrdersRepository {
  constructor(private ordersRepository: Repository<Order>) {}

  async findAllAndFilter(params: findParams): Promise<findResults> {
    const {
      page,
      per_page,
      cep,
      city,
      total,
      initialDate,
      finalDate,
      cancelDate,
      status,
      uf,
    } = params
    const options: FindOptionsWhere<Order> = {}

    if (cep) options.cep = cep
    if (city) options.city = city
    if (total) options.total = total
    if (cancelDate) options.cancelDate = cancelDate
    if (uf) options.uf = uf

    if (finalDate && initialDate) {
      options.initialDate = Between(initialDate, finalDate)
      options.finalDate = Between(initialDate, finalDate)
    } else {
      if (initialDate) {
        options.initialDate = MoreThanOrEqual(initialDate)
      }
      if (finalDate) {
        options.finalDate = LessThanOrEqual(finalDate)
      }
    }

    options.status = status
      ? In([status])
      : In(['Aberto', 'Aprovado', 'Cancelado'])

    let take: number = 0
    let skip: number = 0
    take = per_page ? per_page : 10
    skip = page ? (page - 1) * take : 0

    const [data, count] = await this.ordersRepository.findAndCount({
      where: { ...options },
      relations: ['car', 'customer'],
      skip,
      take,
    })

    if (!data) throw new AppError('Order not found', 404)

    const ids = data.map((order) => order.id)
    const orders = await this.ordersRepository.find({
      where: { id: In(ids) },
      relations: ['car', 'customer'],
    })

    return {
      per_page: take,
      page: page ? page : 1,
      count: count,
      data: orders,
    }
  }

  create(props: CreateOrderProps): OrderModel {
    return this.ordersRepository.create(props)
  }

  async insert(model: OrderModel): Promise<OrderModel> {
    return await this.ordersRepository.save(model)
  }

  async findWithRelations(
    id: string,
    ...relations: string[]
  ): Promise<OrderModel | null> {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: [...relations],
    })
    console.log(order)
    if (!order) throw new Error(`Order not found using id ${id}`)
    return order
  }

  async findById(id: string): Promise<OrderModel> {
    return await this.ordersRepository.findOne({
      where: { id: id },
      relations: { customer: true, car: true },
    })
    // EntityNotFoundError
  }

  async findWithCustomer(id: string): Promise<OrderModel> {
    return await this.ordersRepository.findOne({
      where: { customer: { id: id } },
      relations: ['customer'],
    })
  }

  async update(model: OrderModel): Promise<OrderModel> {
    await this.findById(model.id)
    await this.ordersRepository.update({ id: model.id }, model)
    return model
  }

  async delete(model: OrderModel): Promise<OrderModel> {
    await this.findById(model.id)
    await this.ordersRepository.delete(model.id)
    return model
  }
}
