import { v4 as uuid } from 'uuid';
import { CustomerRepository } from './../domain/repositories/customer.repository';
import { CustomerModel } from './../domain/models/customer.model';

interface Customer {
  id: string;
  fullName: string;
  dateBirth: Date;
  cpf: string;
  email: string;
  phone: string;
  registrationDate: Date;
  deletionDate?: Date | null;
}


  // Implementação da função de validação de CPF
  function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
    let soma = 0;
    let resto;
  
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
  
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
  
    return true;
  }
  


class CustomerService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async createCustomer(input: Omit<Customer, 'id' | 'registrationDate' | 'deletionDate'>): Promise<Customer> {
    if (!validarCPF(input.cpf)) {
      throw new Error('CPF inválido');
    }

    const customerExists = await this.customerRepository.findByEmailOrCPF(input.email, input.cpf);
    if (customerExists && !customerExists.deletionDate) {
      throw new Error('Cliente já existe');
    }

    const newCustomer: Customer = {
      ...input,
      id: uuid(),
      registrationDate: new Date(),
      deletionDate: null
    };

    await this.customerRepository.create(newCustomer as CustomerModel);
    return newCustomer;
  }
}





