// src/users/application/controllers/create-user.controller.ts

import { CreateUserUseCase } from '@/users/usecases/create-user.usecase';
import { Request, Response } from 'express';
import { UsersTypeormRepository } from '../../typeorm/repositories/users-typeorm.repository';
import { TokensTypeormRepository } from '../../typeorm/repositories/tokens-typeorm.repository'; // Importando o TokensTypeormRepository
import { dataSource } from '@/common/infraestructure/typeorm';
import { User } from '../../typeorm/entities/users.entity'; 
import { Token } from '@/users/infraestructure/typeorm/entities/tokens.entity'; 

export async function createUserController(req: Request, res: Response) {
  const { fullName, email, password } = req.body;

  const createUserUseCase = new CreateUserUseCase(
    new UsersTypeormRepository(dataSource.getRepository(User)),
    new TokensTypeormRepository(dataSource.getRepository(Token)) // Passando o TokensTypeormRepository
  );

  try {
    const newUser = await createUserUseCase.execute({
      fullName,
      email,
      password,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
