import { UserRepository } from '../domain/repositories/users.repository'; 
import { UserModel } from '../domain/models/users.model';
import bcrypt from 'bcrypt';

export type CreateUserInput = {
  fullName: string;
  email: string;
  password: string;
};

export type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
};

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user: UserModel = this.userRepository.create({
      ...input,
      password: hashedPassword,
    });
    await this.userRepository.insert(user);

    return {
      id: user.id,
      name: user.fullName,
      email: user.email,
    };
  }
}
