import { CustomerRepository } from '../domain/repositories/customer.repository'
import { CustomerModel } from '../domain/models/customer.model'
import { AppError } from '@/common/domain/errors/app-error'

export class ReadCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<CustomerModel> {
    const customer = await this.customerRepository.findByID(id)
    if (!customer) throw new AppError('Customer dont exist', 404)
    return customer
  }
}
