import { RepositoryInterface } from '@/common/domain/repositories/repository.interface';
import { UserModel } from '@/users/domain/models/users.model';

export type CreateUserProps = {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  registrationDate?: Date;
  deletionDate?: Date | null;
};

export type UserFilterParams = {
  name?: string;
  email?: string;
  deleted?: boolean;
};

export type UserPaginationParams = {
  page: number;
  perPage: number;
};

export type UserOrderByParams = {
  field: 'fullName' | 'registrationDate' | 'deletionDate';
  direction: 'ASC' | 'DESC';
};

export interface UserRepository
  extends RepositoryInterface<UserModel, CreateUserProps> {
  findByID(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  
  findAllWithFilters(
    filters?: UserFilterParams,
    orderBy?: UserOrderByParams[],
    pagination?: UserPaginationParams
  ): Promise<{ users: UserModel[]; total: number }>;
}
