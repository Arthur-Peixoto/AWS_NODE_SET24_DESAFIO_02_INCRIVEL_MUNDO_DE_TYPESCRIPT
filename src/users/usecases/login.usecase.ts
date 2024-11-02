import { UserRepository } from '../domain/repositories/users.repository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export type LoginUserInput = {
  email: string;
  password: string;
};

export type LoginUserOutput = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Não foi possível fazer login');
    }


    // const isPasswordValid = await bcrypt.compare(input.password, user.password);
    // if (!isPasswordValid) {
    //   throw new Error('Invalid credentials');
    // }

    const token = this.generateToken(user.id);

    return {
      id: user.id,
      name: user.fullName,
      email: user.email,
      token: token,
    };
  }

  private generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET || 'default_secret';
    return jwt.sign({ id: userId }, secret, { expiresIn: '10m' }); 
  }
}
