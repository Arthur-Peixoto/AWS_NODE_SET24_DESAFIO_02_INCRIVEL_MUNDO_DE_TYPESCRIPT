import { Request, Response, NextFunction } from 'express';
import { LoginUserUseCase } from '@/users/usecases/login.usecase';
import { UsersTypeormRepository } from '../../typeorm/repositories/users-typeorm.repository';
import { dataSource } from '@/common/infraestructure/typeorm';
import { User } from '../../typeorm/entities/users.entity';

export async function loginUserController(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const loginUserUseCase = new LoginUserUseCase(
    new UsersTypeormRepository(dataSource.getRepository(User))
  );

  try {
    const loggedInUser = await loginUserUseCase.execute({ email, password });
    return res.status(200).json(loggedInUser);
  } catch (error) {
    next(error);
  }
}
