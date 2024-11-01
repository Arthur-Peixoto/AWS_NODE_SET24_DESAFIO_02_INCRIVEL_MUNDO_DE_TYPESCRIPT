// TODO: Configurar retorno de erros da aplicação

import { OrderModel } from '@/orders/domain/models/orders.model'
import {
  OrdersRepository,
  CreateOrderProps,
  findParams,
  findResults,
} from '@/orders/domain/repositories/orders.repository'
import { Repository } from 'typeorm'
import { Order } from '../entities/orders.entity'
import { dataSource } from '@/common/infraestructure/typeorm'

export class OrdersTypeormRepository implements OrdersRepository {
  ordersRepository: Repository<Order>

  constructor() {
    this.ordersRepository = dataSource.getRepository(Order)
  }
  // TODO: findAllAndFilter
  async findAllAndFilter(params: findParams): Promise<findResults> {
    const id: string = params.id
    const [data, count] = await this.ordersRepository.findAndCount({
      where: { id },
    })
    return {
      per_page: 0,
      page: 0,
      count: count,
      data,
    }
  }

  create(props: CreateOrderProps): OrderModel {
    return this.ordersRepository.create(props)
  }

  async insert(model: OrderModel): Promise<OrderModel> {
    return await this.ordersRepository.save(model)
  }

  async findById(id: string): Promise<OrderModel> {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      // relations: { client: true },
    })

    // if (!order) {
    //   throw new EntityNotFoundError(`Order not found using id ${id}`)
    // }

    return order
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
