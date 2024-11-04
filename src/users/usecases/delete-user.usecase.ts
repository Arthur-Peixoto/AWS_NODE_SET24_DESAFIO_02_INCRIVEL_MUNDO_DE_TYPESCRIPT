import { UserModel } from '../domain/models/users.model';
import { UserRepository } from '../domain/repositories/users.repository';
import { AppError } from '@/common/domain/errors/app-error';

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserModel> {
    const userExists = await this.userRepository.findByID(id);

    if (!userExists) {
      throw new AppError("Usuário não existe", 404);
    }

    if (userExists.deletionDate) {
      throw new AppError('Usuário já foi deletado', 400);
    }

    // Define a data de exclusão como a data e hora atual
    userExists.deletionDate = new Date();
    const deletedUser = await this.userRepository.update(userExists);

    return deletedUser;
  }
}
