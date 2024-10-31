// src/users/application/usecases/list-users.usecase.ts

import { UserRepository, UserFilterParams, UserPaginationParams, UserOrderByParams } from '@/users/domain/repositories/users.repository';
import { UserModel } from '@/users/domain/models/users.model';

export type ListUsersInput = {
  filters?: UserFilterParams;
  orderBy?: UserOrderByParams[];
  pagination?: UserPaginationParams;
};

export type ListUsersOutput = {
  users: UserModel[];
  total: number;
  pages: number;
};

export class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: ListUsersInput): Promise<ListUsersOutput> {
    const { filters, orderBy, pagination } = input;

    const { users, total } = await this.userRepository.findAllWithFilters(
      filters,
      orderBy,
      pagination
    );

    const pages = Math.ceil(total / (pagination?.perPage || 10));

    return { users, total, pages };
  }
}
