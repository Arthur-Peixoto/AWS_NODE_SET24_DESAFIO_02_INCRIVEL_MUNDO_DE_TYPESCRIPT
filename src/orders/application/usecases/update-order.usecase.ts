import { AppError } from '@/common/domain/errors/app-error'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'

export type UpdateCarInput = {
  cep?: string
  city?: string
  total?: number
  initialDate?: Date
  finalDate?: Date
  status?: 'Aberto' | 'Aprovado' | 'Cancelado'
  uf?:
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

export type UpdateCarOutput = {
  cep: string
  city: string
  total: number
  initialDate: Date
  finalDate: Date
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

export class UpdateOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute(
    id: string,
    {
      cep,
      city,
      total,
      initialDate,
      finalDate,
      status,
      uf,
    }: UpdateCarInput,
  ): Promise<UpdateCarOutput> {
    const orderExists = await this.orderRepository.findById(id)

    if (!orderExists) {
      throw new AppError("Order does not exist", 404)
    }

    if (initialDate && new Date(initialDate) < new Date(Date.now())) {
      throw new AppError("Initial date can't be less then the current date", 400)
    }

    if (initialDate && finalDate && new Date(finalDate) < new Date(initialDate)) {
      throw new AppError("Final date can't be less then the initial date", 400)
    }

    if (!initialDate) {
      const initialDate = (await this.orderRepository.findById(id)).initialDate
      if (finalDate && new Date(finalDate) < new Date(initialDate)) {
        throw new AppError("Final date can't be less then the initial date", 400)
      }
    }

    const order = {
      id: orderExists.id,
      cep: !cep ? orderExists.cep : cep,
      city: !city ? orderExists.city : city,
      total: !total ? orderExists.total : total,
      initialDate: !initialDate ? orderExists.initialDate : initialDate,
      finalDate: !finalDate ? orderExists.finalDate : finalDate,
      status: !status ? orderExists.status : status,
      uf: !uf ? orderExists.uf : uf,
      cancelDate: orderExists.cancelDate,
      car: orderExists.car,
    }

    const updatedOrder = await this.orderRepository.update(order)

    return updatedOrder
  }
}
