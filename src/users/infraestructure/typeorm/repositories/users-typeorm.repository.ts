// src/users/typeorm/repositories/users-typeorm.repository.ts

import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UserRepository, CreateUserProps, UserFilterParams, UserPaginationParams, UserOrderByParams } from '@/users/domain/repositories/users.repository';
import { UserModel } from '@/users/domain/models/users.model';

export class UsersTypeormRepository implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}
  
  create(props: CreateUserProps): User {
    return this.userRepository.create(props);
  }

  async insert(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findByID(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  
}
