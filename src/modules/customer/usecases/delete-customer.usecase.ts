import { CustomerModel } from "../domain/models/customer.model";
import { CustomerRepository } from "../domain/repositories/customer.repository";
import { AppError } from '@/common/domain/errors/app-error';

export class DeleteUserCustomerCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<CustomerModel> {
    const customerExists = await this.customerRepository.findByID(id);

    if (!customerExists) {
      throw new AppError("Cliente não existe", 404);
    }

    if (customerExists.deletionDate) {
      throw new AppError('Cliente já foi deletado', 400);
    }

    // Define a data de exclusão como a data e hora atual
    customerExists.deletionDate = new Date();
    const deletedCustomer = await this.customerRepository.update(customerExists);

    return deletedCustomer;
  }
}
