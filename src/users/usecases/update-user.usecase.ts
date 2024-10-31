import { UserRepository } from '@/users/domain/repositories/users.repository';
import { UserModel } from '@/users/domain/models/users.model';

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
      throw new Error('Usuário inexistente');
    }

    const updatedData: UserModel = {
        id: user.id,
        fullName: input.fullName ?? user.fullName,
        email: input.email ?? user.email,
        password: input.password ?? user.password,
        registrationDate: user.registrationDate,
        deletionDate: user.deletionDate,
    };

    const updatedUser = await this.userRepository.update(updatedData);
    if (!updatedUser) {
      throw new Error('Erro ao atualizar o usuário');
    }

    return {
      id: updatedUser.id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    };
  }
}
