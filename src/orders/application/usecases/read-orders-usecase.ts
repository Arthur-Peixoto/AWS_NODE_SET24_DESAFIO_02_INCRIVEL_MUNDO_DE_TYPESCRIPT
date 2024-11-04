import { ufUnion } from '@/orders/utils/ufUnion'
import { readOutput } from './read-order.usecase'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'

export type readOrdersInput = {
  page?: number
  per_page?: number
  cep?: string
  city?: string
  total?: number
  initialDate?: Date
  finalDate?: Date
  cancelDate?: Date
  clientCpf?: string
  status?: 'Aberto' | 'Aprovado' | 'Cancelado'
  uf?: ufUnion
}

export type readOrdersOutput = {
  per_page: number
  page: number
  count: number
  data: readOutput[]
}

export class ReadOrdersUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute(input: readOrdersInput): Promise<readOrdersOutput> {
    const searchResults = await this.orderRepository.findAllAndFilter(input)
    const returnedData: readOutput[] = []
    searchResults.data.map((order) => {
      returnedData.push(order)
    })
    return { ...searchResults, data: returnedData }
  }
}
