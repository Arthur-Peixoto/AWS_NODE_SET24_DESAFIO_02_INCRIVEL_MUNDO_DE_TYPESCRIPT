

import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CustomerRepository, CreateCustomerProps, CustomerFilterParams, CustomerPaginationParams, CustomerOrderByParams } from '../../domain/repositories/customer.repository'
import { CustomerModel } from '../../domain/models/cutomer.model';


export class CustomersTypeormRepository implements CustomerRepository {
  constructor(private readonly customerRepository: Repository<Customer>) {}
  findById(id: string): Promise<CustomerModel> {
    return this.customerRepository.findOne({where: {id}});
  }
  
  update(model: CustomerModel): Promise<CustomerModel> {
    return this.customerRepository.save(model);
  }

  delete(customer: CustomerModel): Promise<CustomerModel> {
    throw new Error('Method not implemented.');
  }

  create(props: CreateCustomerProps): Customer {
    return this.customerRepository.create(props);
  }

  async insert(customer: Customer): Promise<Customer> {
    return await this.customerRepository.save(customer);
  }

  async findByID(id: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({ where: { email } });
  }

  async findAllWithFilters(
    filters: CustomerFilterParams = {},
    orderBy: CustomerOrderByParams[] = [],
    pagination: CustomerPaginationParams = { page: 1, perPage: 10 }
  ): Promise<{ customers: Customer[]; total: number }> {
    const queryBuilder = this.customerRepository.createQueryBuilder('customer');

    if (filters.name) {
      queryBuilder.andWhere('customer.fullName ILIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.email) {
      queryBuilder.andWhere('customer.email ILIKE :email', { email: `%${filters.email}%` });
    }
    if (filters.deleted !== undefined) {
      if (filters.deleted) {
        queryBuilder.andWhere('customer.deletionDate IS NOT NULL');
      } else {
        queryBuilder.andWhere('customer.deletionDate IS NULL');
      }
    }

    for (const order of orderBy) {
      queryBuilder.addOrderBy(`customer.${order.field}`, order.direction);
    }

    const total = await queryBuilder.getCount();
    queryBuilder.skip((pagination.page - 1) * pagination.perPage).take(pagination.perPage);

    const customers = await queryBuilder.getMany();
    return { customers, total };
  }
}
