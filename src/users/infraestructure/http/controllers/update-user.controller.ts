// src/users/infraestructure/http/controllers/update-user.controller.ts

import { Request, Response } from 'express';
import { UpdateUserUseCase } from '@/users/usecases/update-user.usecase';
import { UsersTypeormRepository } from '../../typeorm/repositories/users-typeorm.repository';
import { dataSource } from '@/common/infraestructure/typeorm';
import { User } from '../../typeorm/entities/users.entity';

export async function updateUserController(req: Request, res: Response) {
  const { id } = req.params;
  const { fullName, email, password } = req.body;

  const updateUserUseCase = new UpdateUserUseCase(
    new UsersTypeormRepository(dataSource.getRepository(User)),
  );

  try {
    const updatedUser = await updateUserUseCase.execute({
      id,
      fullName,
      email,
      password,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
