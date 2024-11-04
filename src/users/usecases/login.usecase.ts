import { UserRepository } from '../domain/repositories/users.repository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from '@/common/domain/errors/app-error';

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
      throw new AppError('Usuário não encontrado', 404);
    }
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Senha incorreta', 401);
    }
    const token = this.generateToken(user.id);
    return {
      id: user.id,
      name: user.fullName,
      email: user.email,
      token,
    };
  }

  private generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET;
    const expiresIn = '10m';
    if (!secret) {
      throw new AppError('Não pegou a chave do .env', 500);
    }
    return jwt.sign({ id: userId }, secret, { expiresIn });
  }
}
