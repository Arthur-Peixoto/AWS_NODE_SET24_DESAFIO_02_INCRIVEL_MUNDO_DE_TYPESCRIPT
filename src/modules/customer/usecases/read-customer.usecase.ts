import { CustomerRepository } from '../domain/repositories/customer.repository'
import { CustomerModel } from '../domain/models/customer.model'

export class ReadCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<CustomerModel> {
    const customer = await this.customerRepository.findByID(id)
    if (!customer) throw new Error('Cliente not found')
    return customer
  }
}
