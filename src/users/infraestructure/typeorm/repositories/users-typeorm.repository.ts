import { UserModel } from '@/users/domain/models/users.model'
import { UserRepository } from '@/users/domain/repositories/users.repository'
import { Repository } from 'typeorm'
import { User } from '../entities/users.entity'

export class UsersTypeormRepository implements UserRepository {
  constructor(private usersRepository: Repository<User>) {}
    findByID(id: string): Promise<UserModel | null> {
        throw new Error('Method not implemented.')
    }
    
  create(props: Partial<UserModel>): UserModel {
    return this.usersRepository.create(props)
  }

  async insert(model: UserModel): Promise<UserModel> {
    return await this.usersRepository.save(model)
  }

    findById(id: string): Promise<UserModel | null> {
    return this.usersRepository.findOne({ where: { id } })
  }

  async update(model: UserModel): Promise<UserModel> {
    return await this.usersRepository.save(model)
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return await this.usersRepository.findOne({ where: { email } }) //tem que usar essa bagaça pra login
  }
}
