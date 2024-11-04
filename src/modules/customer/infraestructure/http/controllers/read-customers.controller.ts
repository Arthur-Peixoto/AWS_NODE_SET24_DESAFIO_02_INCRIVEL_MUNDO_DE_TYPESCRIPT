import { NextFunction, Request, Response } from 'express'
import { dataSource } from '@/common/infraestructure/typeorm'
import Customer from '../../typeorm/entities/customer.entity'
import { CustomersTypeormRepository } from '../../typeorm/repositories/customers.typeorm.repository'
import { ReadCustomerUseCase } from '@/modules/customer/usecases/read-customer.usecase'
import { ListCustomersInput, ReadCustomersUseCase } from '@/modules/customer/usecases/read-customers.usecase'

export async function listCustomersController(req: Request, res: Response, next: NextFunction) {
  const filters = {
    name: req.query.name?.toString(),
    email: req.query.email?.toString(),
    deleted: req.query.deleted === 'true',
  };

  const orderBy = [
    {
      field: req.query.orderField?.toString() || 'fullName',
      direction: req.query.orderDirection === 'DESC' ? 'DESC' : 'ASC',
    },
  ];

  const pagination = {
    page: parseInt(req.query.page as string) || 1,
    perPage: parseInt(req.query.perPage as string) || 10,
  };

  const readCustomersUseCase = new ReadCustomersUseCase(
    new CustomersTypeormRepository(dataSource.getRepository(Customer))
  );

  try {
    const result = await readCustomersUseCase.execute({ filters, orderBy, pagination } as ListCustomersInput);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
