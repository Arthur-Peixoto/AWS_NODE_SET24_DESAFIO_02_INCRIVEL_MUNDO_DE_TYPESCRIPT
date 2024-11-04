import { NextFunction, Request, Response } from 'express'
import { dataSource } from '@/common/infraestructure/typeorm'
import { CreateCustomerUseCase } from '@/modules/customer/usecases/create-customer.usecase'
import Customer from '../../typeorm/entities/customer.entity'
import { CustomersTypeormRepository } from '../../typeorm/repositories/customers.typeorm.repository'

export async function createCustomerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { fullName, dateBirth, email, cpf, phone } = req.body

    const createCarUseCase = new CreateCustomerUseCase(
      new CustomersTypeormRepository(dataSource.getRepository(Customer)),
    )
    const newCustomer = await createCarUseCase.execute({
      fullName,
      dateBirth,
      email,
      cpf,
      phone,
    })

    return res.status(201).json(newCustomer)
  } catch (err) {
    next(err)
  }
}
