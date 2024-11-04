import { UserRepository } from '../domain/repositories/users.repository'; 
import { UserModel } from '../domain/models/users.model';
import bcrypt from 'bcrypt';
import { AppError } from '@/common/domain/errors/app-error';

export type CreateUserInput = {
  fullName: string;
  email: string;
  password: string;
};

export type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new AppError('Email já cadastrado', 409);
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(input.password, 10);
    } catch (error) {
      throw new AppError('Erro ao processar a senha', 500);
    }
    const user: UserModel = this.userRepository.create({
      ...input,
      password: hashedPassword,
    });
    const insertedUser = await this.userRepository.insert(user);
    if (!insertedUser) {
      throw new AppError('Erro ao inserir usuário', 500);
    }

    return {
      id: user.id,
      name: user.fullName,
      email: user.email,
    };
  }
}
