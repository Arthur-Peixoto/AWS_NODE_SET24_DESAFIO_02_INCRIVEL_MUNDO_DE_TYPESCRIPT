import { CustomerRepository } from './../domain/repositories/customer.repository'
import { CustomerModel } from './../domain/models/customer.model'
import { AppError } from '@/common/domain/errors/app-error'
interface CreateCustomer {
  fullName: string
  dateBirth: Date
  cpf: string
  email: string
  phone: string
}

// Implementação da função de validação de CPF
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false
  }
  let soma = 0
  let resto

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }
  resto = (soma * 10) % 11

  if (resto === 10 || resto === 11) {
    resto = 0
  }
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false
  }

  soma = 0
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  resto = (soma * 10) % 11

  if (resto === 10 || resto === 11) {
    resto = 0
  }
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false
  }

  return true
}

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(input: CreateCustomer): Promise<CustomerModel> {
    if (!validarCPF(input.cpf)) {
      throw new AppError('CPF inválido', 404)
    }

    const customerExists =
      (await this.customerRepository.findByCPF(input.cpf)) ||
      (await this.customerRepository.findByEmail(input.email))

    if (customerExists && customerExists.deleted_at) {
      throw new AppError('Customer already exist', 409)
    }

    const newCustomer = await this.customerRepository.create({ ...input })
    await this.customerRepository.insert(newCustomer)
    return newCustomer
  }
}
