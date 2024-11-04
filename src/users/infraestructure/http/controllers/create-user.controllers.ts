import { CreateUserUseCase } from '@/users/usecases/create-user.usecase';
import { NextFunction, Request, Response } from 'express';
import { UsersTypeormRepository } from '../../typeorm/repositories/users-typeorm.repository';
import { dataSource } from '@/common/infraestructure/typeorm';
import { User } from '../../typeorm/entities/users.entity'; 

export async function createUserController(req: Request, res: Response, next: NextFunction) {
  const { fullName, email, password } = req.body;

  const createUserUseCase = new CreateUserUseCase(
    new UsersTypeormRepository(dataSource.getRepository(User)),
  );

  try {
    const newUser = await createUserUseCase.execute({
      fullName,
      email,
      password,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}
