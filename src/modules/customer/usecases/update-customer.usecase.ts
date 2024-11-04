import { CustomerRepository } from '../domain/repositories/customer.repository'
import { CustomerModel } from '../domain/models/customer.model'
import { AppError } from '@/common/domain/errors/app-error'

export type UpdateCustomerInput = {
  id: string
  dateBirth?: Date
  phone?: string
  fullName?: string
  email?: string
  cpf?: string
}

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(input: UpdateCustomerInput): Promise<CustomerModel> {
    const customer = await this.customerRepository.findByID(input.id)

    if (!customer) {
      if (customer.deleted_at) throw new AppError('Customer not found', 404)
    }

    if (input.email && input.email !== customer.email) {
      const duplicatedEmail = await this.customerRepository.findByEmail(
        input.email,
      )
      const duplicatedCpf = await this.customerRepository.findByCPF(input.cpf)
      if (duplicatedCpf) {
        if (duplicatedCpf.id !== customer.id) {
          throw new AppError('Costumer already exist', 409)
        }
      }
      if (duplicatedEmail) {
        if (duplicatedEmail.id !== customer.id) {
          throw new AppError('Costumer already exist', 409)
        }
      }
    }

    const updatedData: CustomerModel = {
      ...customer,
      fullName: input.fullName ?? customer.fullName,
      email: input.email ?? customer.email,
    }

    const updatedCustomer = await this.customerRepository.update(updatedData)
    if (!updatedCustomer) {
      throw new AppError('Internal server error', 500)
    }

    return updatedCustomer
  }
}
