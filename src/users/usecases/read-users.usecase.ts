import { UserRepository, UserFilterParams, UserPaginationParams, UserOrderByParams } from '@/users/domain/repositories/users.repository';
import { UserModel } from '@/users/domain/models/users.model';
import { AppError } from '@/common/domain/errors/app-error';

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

    // if (pagination && pagination.perPage <= 0) {
    //   throw new AppError('Número de itens por página deve ser maior que zero', 400);
    // }
    // Vou fazer isso com celebrate
    
    try {
      const { users, total } = await this.userRepository.findAllWithFilters(
        filters,
        orderBy,
        pagination
      );

      const perPage = pagination?.perPage || 10;
      const pages = Math.ceil(total / perPage);

      return { users, total, pages };
    } catch (error) {
      throw new AppError('Erro ao listar usuários', 500);
    }
  }
}
