import { NextFunction, Request, Response } from 'express'
import { dataSource } from '@/common/infraestructure/typeorm'
import Customer from '../../typeorm/entities/customer.entity'
import { CustomersTypeormRepository } from '../../typeorm/repositories/customers.typeorm.repository'
import { UpdateCustomerUseCase } from '@/modules/customer/usecases/update-customer.usecase'

export async function updateCustomerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { fullName, dateBirth, email, cpf, phone } = req.body

    const updateCarUseCase = new UpdateCustomerUseCase(
      new CustomersTypeormRepository(dataSource.getRepository(Customer)),
    )
    const updatedCustomer = await updateCarUseCase.execute({
      fullName,
      dateBirth,
      email,
      cpf,
      phone,
    })

    return res.status(200).json(updatedCustomer)
  } catch (err) {
    next(err)
  }
}
