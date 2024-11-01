import { UserModel } from '../domain/models/users.model'
import { UserRepository } from '../domain/repositories/users.repository'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserModel> {
    const userExists = await this.userRepository.findByID(id)

    if (!userExists) {
      throw new Error("Usuário não existe")
    }

    if (userExists.deletionDate) {
      throw new Error('Usuário já foi deletado')
    }
    userExists.deletionDate = new Date()
    const deletedUser = await this.userRepository.update(userExists)

    return deletedUser
  }
}
