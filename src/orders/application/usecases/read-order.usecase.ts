import { CarModel } from '@/cars/domain/models/cars.model'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'

export type readOutput = {
  id: string
  cep: string
  city: string
  total: number
  initialDate: Date
  finalDate: Date
  cancelDate: Date
  // clients: ClientModel[]
  car: CarModel
  status: 'Aberto' | 'Aprovado' | 'Cancelado'
  uf:
    | 'AC'
    | 'AL'
    | 'AM'
    | 'AP'
    | 'BA'
    | 'CE'
    | 'DF'
    | 'ES'
    | 'GO'
    | 'MA'
    | 'MG'
    | 'MS'
    | 'MT'
    | 'PA'
    | 'PB'
    | 'PE'
    | 'PI'
    | 'PR'
    | 'RJ'
    | 'RN'
    | 'RO'
    | 'RR'
    | 'RS'
    | 'SC'
    | 'SE'
    | 'SP'
    | 'TO'
}

export class ReadOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute(id: string): Promise<readOutput> {
    const order = await this.orderRepository.findById(id)

    return order
  }
}
