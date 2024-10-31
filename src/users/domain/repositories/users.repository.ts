// src/users/domain/repositories/user.repository.ts

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



export interface UserRepository
  extends RepositoryInterface<UserModel, CreateUserProps> {
  findByID(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  
  findAllWithFilters(
    filters?: UserFilterParams,
    
  ): Promise<{ users: UserModel[]; total: number }>;
}
