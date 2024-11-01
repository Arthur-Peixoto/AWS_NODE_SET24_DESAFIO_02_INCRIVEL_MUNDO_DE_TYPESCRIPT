import { Request, Response } from 'express';
import { LoginUserUseCase } from '@/users/usecases/login.usecase';
import { UsersTypeormRepository } from '../../typeorm/repositories/users-typeorm.repository';
import { dataSource } from '@/common/infraestructure/typeorm';
import { User } from '../../typeorm/entities/users.entity';

export async function loginUserController(req: Request, res: Response) {
  const { email, password } = req.body;

  const loginUserUseCase = new LoginUserUseCase(
    new UsersTypeormRepository(dataSource.getRepository(User))
  );

  try {
    const loggedInUser = await loginUserUseCase.execute({ email, password });
    return res.status(200).json(loggedInUser);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
