import { UserRepository } from '@/users/domain/repositories/users.repository';
import { UserModel } from '@/users/domain/models/users.model';

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserModel> {
    const user = await this.userRepository.findByID(id);
    if (!user) throw new Error('User not found');
    return user;
  }
}
