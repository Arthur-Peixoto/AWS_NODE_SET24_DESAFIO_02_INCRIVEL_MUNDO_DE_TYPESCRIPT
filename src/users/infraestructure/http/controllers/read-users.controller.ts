// src/users/controllers/list-users.controller.ts

import { NextFunction, Request, Response } from 'express';
import { ListUsersUseCase, ListUsersInput } from '@/users/usecases/read-users.usecase';
import { UsersTypeormRepository } from '@/users/infraestructure/typeorm/repositories/users-typeorm.repository';
import { dataSource } from '@/common/infraestructure/typeorm';
import { User } from '@/users/infraestructure/typeorm/entities/users.entity';

export async function listUsersController(req: Request, res: Response, next: NextFunction) {
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

  const listUsersUseCase = new ListUsersUseCase(
    new UsersTypeormRepository(dataSource.getRepository(User))
  );

  try {
    const result = await listUsersUseCase.execute({ filters, orderBy, pagination } as ListUsersInput);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
