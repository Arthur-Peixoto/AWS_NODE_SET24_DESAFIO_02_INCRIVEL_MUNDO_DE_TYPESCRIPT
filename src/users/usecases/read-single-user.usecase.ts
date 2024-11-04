import { UserRepository } from '@/users/domain/repositories/users.repository';
import { UserModel } from '@/users/domain/models/users.model';
import { AppError } from '@/common/domain/errors/app-error';

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserModel> {
    const user = await this.userRepository.findByID(id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    return user;
  }
}
