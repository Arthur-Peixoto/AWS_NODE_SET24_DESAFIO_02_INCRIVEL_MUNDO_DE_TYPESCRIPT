import { CustomerModel } from './../domain/models/customer.model'
import {
  CustomerRepository,
  CustomerFilterParams,
  CustomerPaginationParams,
  CustomerOrderByParams,
} from '../domain/repositories/customer.repository'

export type ListCustomersInput = {
  filters?: CustomerFilterParams
  orderBy?: CustomerOrderByParams[]
  pagination?: CustomerPaginationParams
}

export type ListCustomersOutput = {
  customers: CustomerModel[]
  total: number
  pages: number
}

export class ReadCustomersUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(input: ListCustomersInput): Promise<ListCustomersOutput> {
    const { filters, orderBy, pagination } = input

    const { customers, total } =
      await this.customerRepository.findAllWithFilters(
        filters,
        orderBy,
        pagination,
      )

    const pages = Math.ceil(total / (pagination?.perPage || 10))

    return { customers, total, pages }
  }
}
