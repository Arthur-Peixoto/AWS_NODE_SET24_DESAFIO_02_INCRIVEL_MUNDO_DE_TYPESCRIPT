// src/users/typeorm/repositories/users-typeorm.repository.ts

import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UserRepository, CreateUserProps, UserFilterParams, UserPaginationParams, UserOrderByParams } from '@/users/domain/repositories/users.repository';
import { UserModel } from '@/users/domain/models/users.model';

export class UsersTypeormRepository implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}
  findById(id: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  update(model: UserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

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

  async findAllWithFilters(
    filters: UserFilterParams = {},
    orderBy: UserOrderByParams[] = [],
    pagination: UserPaginationParams = { page: 1, perPage: 10 }
  ): Promise<{ users: User[]; total: number }> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (filters.name) {
      queryBuilder.andWhere('user.fullName ILIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.email) {
      queryBuilder.andWhere('user.email ILIKE :email', { email: `%${filters.email}%` });
    }
    if (filters.deleted !== undefined) {
      if (filters.deleted) {
        queryBuilder.andWhere('user.deletionDate IS NOT NULL');
      } else {
        queryBuilder.andWhere('user.deletionDate IS NULL');
      }
    }

    for (const order of orderBy) {
      queryBuilder.addOrderBy(`user.${order.field}`, order.direction);
    }

    const total = await queryBuilder.getCount();
    queryBuilder.skip((pagination.page - 1) * pagination.perPage).take(pagination.perPage);

    const users = await queryBuilder.getMany();
    return { users, total };
  }
}
