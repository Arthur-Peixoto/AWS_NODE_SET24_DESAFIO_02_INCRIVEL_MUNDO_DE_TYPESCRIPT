import { NextFunction, Request, Response } from 'express'
import { dataSource } from '@/common/infraestructure/typeorm'
import Customer from '../../typeorm/entities/customer.entity'
import { CustomersTypeormRepository } from '../../typeorm/repositories/customers.typeorm.repository'
import { ReadCustomerUseCase } from '@/modules/customer/usecases/read-customer.usecase'

export async function readCustomerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.body

    const readCarUseCase = new ReadCustomerUseCase(
      new CustomersTypeormRepository(dataSource.getRepository(Customer)),
    )
    const customer = await readCarUseCase.execute(id)

    return res.status(201).json(customer)
  } catch (err) {
    next(err)
  }
}
