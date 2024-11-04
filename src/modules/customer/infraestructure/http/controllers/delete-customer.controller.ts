import { NextFunction, Request, Response } from 'express'
import { dataSource } from '@/common/infraestructure/typeorm'
import { CreateCustomerUseCase } from '@/modules/customer/usecases/create-customer.usecase'
import Customer from '../../typeorm/entities/customer.entity'
import { CustomersTypeormRepository } from '../../typeorm/repositories/customers.typeorm.repository'
import { DeleteCustomerUseCase } from '@/modules/customer/usecases/delete-customer.usecase'

export async function deleteCustomerController(req: Request, res: Response, next:NextFunction) {
  try {
      const { id } = req.params;

      const deleteCustomerUseCase = new DeleteCustomerUseCase(
          new CustomersTypeormRepository(dataSource.getRepository(Customer)),
      );
      const deletedCustomer = await deleteCustomerUseCase.execute(id);
      return res.status(201).json(deletedCustomer);
  } catch (error) {
      next(error);
  }
}