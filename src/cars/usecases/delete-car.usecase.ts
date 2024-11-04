import { AppError } from '@/common/domain/errors/app-error'
import { CarModel } from '../domain/models/cars.model'
import { CarsRepository } from '../domain/repositories/cars.repository'
import { OrdersRepository } from '@/orders/domain/repositories/orders.repository'

export type DeleteCarOutput = {
  id: string
  model: string
  brand: string
  licensePlate: string
  mileage?: number
  year: number
  items: string[]
  price: number
  registrationDate: Date
  status: 'ativo' | 'inativo' | 'excluído'
}

export class DeleteCarUseCase {
  constructor(
    private carRepository: CarsRepository,
    private orderRepository: OrdersRepository,
  ) {}

  async execute(id: string): Promise<DeleteCarOutput> {
    const carExists = await this.carRepository.findById(id)

    if (!carExists) {
      throw new AppError("Car don't exist", 404)
    }

    const order = await this.orderRepository.findWithCar(carExists.id)

    if (order && order.status === 'Aberto')
      throw new AppError('Car has a open order', 409)
    carExists.status = 'excluído'

    const deletedCar = await this.carRepository.delete(carExists)
    const itemsName = deletedCar.items.map((item) => item.name)
    return { ...deletedCar, items: itemsName }
  }
}
