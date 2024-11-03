import { RepositoryInterface } from '@/common/domain/repositories/repository.interface';
import { CustomerModel } from './../models/cutomer.model';

export type CreateCustomerProps = {
  id?: string;
  fullName: string;
  email: string;
  dateBirth: Date;
  cpf: string;
  phone: string;
  registrationDate?: Date;
  deletionDate?: Date | null;
};

export type CustomerFilterParams = {
  name?: string;
  email?: string;
  deleted?: boolean;
};

export type CustomerPaginationParams = {
  page: number;
  perPage: number;
};

export type CustomerOrderByParams = {
  field: 'fullName' | 'registrationDate' | 'deletionDate';
  direction: 'ASC' | 'DESC';
};

export interface CustomerRepository
  extends RepositoryInterface<CustomerModel, CreateCustomerProps> {
  findByID(id: string): Promise<CustomerModel | null>;
  findByEmail(email: string): Promise<CustomerModel | null>;
  
  findAllWithFilters(
    filters?: CustomerFilterParams,
    orderBy?: CustomerOrderByParams[],
    pagination?: CustomerPaginationParams
  ): Promise<{ customers: CustomerModel[]; total: number }>;
}
