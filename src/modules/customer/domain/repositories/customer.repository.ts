import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { CustomerModel } from '../models/customer.model'

export type CreateCustomerProps = {
  deleted_at?: Date
  fullName: string
  email: string
  dateBirth: Date
  cpf: string
  phone: string
  registrationDate?: Date
}

export type CustomerFilterParams = {
  deleted?: any
  name?: string
  email?: string
  cpf?: string
}

export type CustomerPaginationParams = {
  page: number
  perPage: number
}

export type CustomerOrderByParams = {
  field: 'fullName' | 'registrationDate' | 'cpf'
  direction: 'ASC' | 'DESC'
}

export interface CustomerRepository
  extends RepositoryInterface<CustomerModel, CreateCustomerProps> {
  findByID(id: string): Promise<CustomerModel | null>
  findByEmail(email: string): Promise<CustomerModel | null>
  findByCPF(cpf: string): Promise<CustomerModel | null>
  findAllWithFilters(
    filters?: CustomerFilterParams,
    orderBy?: CustomerOrderByParams[],
    pagination?: CustomerPaginationParams,
  ): Promise<{ customers: CustomerModel[]; total: number }>
}
