import { UserRepository } from '@/users/domain/repositories/users.repository';
import { UserModel } from '@/users/domain/models/users.model';
import { AppError } from '@/common/domain/errors/app-error';
import bcrypt from 'bcrypt';

export type UpdateUserInput = {
  id: string;
  fullName?: string;
  email?: string;
  password?: string;
};

export type UpdateUserOutput = {
  id: string;
  fullName: string;
  email: string;
};

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {

    const user = await this.userRepository.findByID(input.id);
    if (!user || user.deletionDate) {
      throw new AppError('Usuário inexistente ou já removido', 404);
    }

    if (input.email && input.email !== user.email) {
      const duplicatedEmail = await this.userRepository.findByEmail(input.email);
      if (duplicatedEmail && duplicatedEmail.id !== user.id) {
        throw new AppError('Email já cadastrado', 409);
      }
    }


    const updatedData: UserModel = {
      ...user,
      fullName: input.fullName ?? user.fullName,
      email: input.email ?? user.email,
      password: hashedPassword,
    };

    const updatedUser = await this.userRepository.update(updatedData);
    if (!updatedUser) {
      throw new AppError('Erro ao atualizar usuário', 500);
    }

    return {
      id: updatedUser.id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    };
  }
}
