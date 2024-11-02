import { UserRepository } from '../domain/repositories/users.repository'; 
import { UserModel } from '../domain/models/users.model';
import jwt from 'jsonwebtoken';

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
    const user: UserModel = this.userRepository.create(input);
    await this.userRepository.insert(user);


    return {
      id: user.id,
      name: user.fullName,
      email: user.email,
    };
  }

  // private generateToken(userId: string): string {
  //   const secret = process.env.JWT_SECRET || 'default_secret';
  //   return jwt.sign({ id: userId }, secret, { expiresIn: '10m' });
  // }
}
