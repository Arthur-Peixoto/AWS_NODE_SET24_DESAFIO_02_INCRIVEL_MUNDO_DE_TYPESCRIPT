import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '@/users/usecases/read-single-user.usecase';
import { UsersTypeormRepository } from '@/users/infraestructure/typeorm/repositories/users-typeorm.repository';
import { dataSource } from '@/common/infraestructure/typeorm';
import { User } from '@/users/infraestructure/typeorm/entities/users.entity';
import { NextFunction } from 'express-serve-static-core';

export async function getUserByIdController(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const getUserByIdUseCase = new GetUserByIdUseCase(
    new UsersTypeormRepository(dataSource.getRepository(User))
  );

  try {
    const user = await getUserByIdUseCase.execute(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
