import { CustomerRepository } from "../domain/repositories/customer.repository";
import { CustomerModel } from "../domain/models/customer.model";
import { AppError } from '@/common/domain/errors/app-error';

export type UpdateCustomerInput = {
  id: string;
  fullName?: string;
  email?: string;
  cpf?: string;
};

export type UpdateCustomerOutput = {
  id: string;
  fullName: string;
  email: string;
  cpf: string;
};

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(input: UpdateCustomerInput): Promise<UpdateCustomerOutput> {

    const customer = await this.customerRepository.findByID(input.id);
    if (!customer || customer.deletionDate) {
      throw new AppError('Cliente inexistente ou já removido', 404);
    }

    if (input.email && input.email !== customer.email) {
      const duplicatedEmail = await this.customerRepository.findByEmail(input.email);
      if (duplicatedEmail && duplicatedEmail.id !== customer.id) {
        throw new AppError('Email já cadastrado', 409);
      }
    }

    
    const updatedData: CustomerModel = {
      ...customer,
      fullName: input.fullName ?? customer.fullName,
      email: input.email ?? customer.email,
    };

    const updatedCustomer = await this.customerRepository.update(updatedData);
    if (!updatedCustomer) {
      throw new AppError('Erro ao atualizar usuário', 500);
    }

    return {
      id: updatedCustomer.id,
      fullName: updatedCustomer.fullName,
      email: updatedCustomer.email,
      cpf: updatedCustomer.cpf,
    };
  }
}