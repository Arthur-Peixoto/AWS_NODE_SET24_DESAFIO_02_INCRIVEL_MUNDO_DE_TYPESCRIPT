import { CarSchema } from '@/orders/utils/schemas'
import { Request, Response } from 'express'
import { z } from 'zod'
import { OrdersTypeormRepository } from '../../typeorm/entities/repositories/orders-typeorm.repository'
import { dataSource } from '@/common/infraestructure/typeorm'
import { Order } from '../../typeorm/entities/entities/orders.entity'
import { CreateOrderUseCase } from '@/orders/application/usecases/create-order.usecase'

export async function createOrderController(
  request: Request,
  response: Response,
) {
  const createOrderBodySchema = z.object({
    car: CarSchema,
    // client: ClientSchema
  })

  const validatedData = createOrderBodySchema.safeParse(request.body)

  if (validatedData.success === false) {
    console.error('Invalid data', validatedData.error.format())
    // TODO: AppError
    throw new Error(
      `${validatedData.error.errors.map((err) => {
        return `${err.path} => ${err.message}`
      })}`,
    )
  }

  const { car } = request.body

  const createOrderUseCase = new CreateOrderUseCase.UseCase(
    new OrdersTypeormRepository(dataSource.getRepository(Order))
  )

  const order = await createOrderUseCase.execute({
    car,
    //client,
  })

  return response.status(201).json(order)
}
