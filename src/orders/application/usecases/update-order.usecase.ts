import { AppError } from '@/common/domain/errors/app-error'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'
import { isValidUF, ufUnion } from '@/orders/utils/ufUnion'

export type UpdateOrderInput = {
  cep?: string
  total?: number
  initialDate?: Date
  finalDate?: Date
  cancelDate?: Date
  status?: 'Aberto' | 'Aprovado' | 'Cancelado'
}

export type UpdateOrderOutput = {
  cep: string
  city: string
  total: number
  initialDate: Date
  finalDate: Date
  status: 'Aberto' | 'Aprovado' | 'Cancelado'
  uf: ufUnion
}

export class UpdateOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute(
    id: string,
    {
      cep,
      total,
      initialDate,
      finalDate,
      cancelDate,
      status,
    }: UpdateOrderInput,
  ): Promise<UpdateOrderOutput> {
    const orderExists = await this.orderRepository.findById(id)

    if (!orderExists) {
      throw new AppError('Order does not exist', 404)
    }

    if (initialDate && new Date(initialDate) < new Date(Date.now())) {
      throw new AppError(
        "Initial date can't be less then the current date",
        400,
      )
    }

    if (
      initialDate &&
      finalDate &&
      new Date(finalDate) < new Date(initialDate)
    ) {
      throw new AppError("Final date can't be less then the initial date", 400)
    }

    if (!initialDate) {
      const initialDate: Date = orderExists.initialDate
      if (finalDate && new Date(finalDate) < new Date(initialDate)) {
        throw new AppError(
          "Final date can't be less then the initial date",
          400,
        )
      }
    }

    let uf: ufUnion
    let city: string

    if (cep) {
      const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await cepResponse.json()

      if (data.erro) {
        throw new AppError('This CEP does not exist', 400)
      }

      if (!data) {
        throw new AppError('Failed to search for CEP', 404)
      }

      if (!isValidUF(data.uf)) {
        throw new AppError('No momento não temos filiais nessa região', 400)
      }

      uf = data.uf
      city = data.localidade
    }

    switch (status) {
      case 'Aprovado':
        if (
          orderExists.status == 'Cancelado' ||
          !(cep && total && initialDate && finalDate && !cancelDate)
        )
          throw new AppError(
            "Order is cancelled or has a null field or a 'cancelDate' field",
            400,
          )
        break
      case 'Aberto':
        if (orderExists.status == 'Cancelado')
          throw new AppError('Order is already cancelled', 400)
        if (orderExists.status == 'Aprovado')
          throw new AppError('Order is already approved', 400)
        break
      case 'Cancelado':
        if (orderExists.status == 'Aprovado' || !cancelDate)
          throw new AppError(
            "Order is approved or misses a 'cancelDate' field",
            400,
          )
        break
    }

    const order = {
      id: orderExists.id,
      cep: !cep ? orderExists.cep : cep,
      city: !cep ? orderExists.city : city,
      total: !total ? orderExists.total : total,
      initialDate: !initialDate ? orderExists.initialDate : initialDate,
      finalDate:
        finalDate && status == 'Cancelado' ? finalDate : orderExists.finalDate,
      status: !status ? orderExists.status : status,
      uf: !cep ? orderExists.uf : uf,
      cancelDate: !cancelDate ? orderExists.cancelDate : cancelDate,
      car: orderExists.car,
    }

    const updatedOrder = await this.orderRepository.update(order)

    return updatedOrder
  }
}
