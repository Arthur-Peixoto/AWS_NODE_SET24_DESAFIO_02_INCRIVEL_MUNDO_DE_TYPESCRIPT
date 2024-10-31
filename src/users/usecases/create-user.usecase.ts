import { UserRepository } from '../domain/repositories/users.repository'; 
import { TokenRepository } from '../domain/repositories/tokens.repository';
import { UserModel } from '../domain/models/users.model'; 
import jwt from 'jsonwebtoken';

export type CreateUserInput = {
  fullName: string;
  email: string;
  password: string; // será que eu faço o hash aqui????? n sei 
};

export type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
  token: string; // Adicionando o token no retorno
};

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokensRepository: TokenRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    // Criar usuário
    const user: UserModel = this.userRepository.create(input);
    await this.userRepository.insert(user);

    // Criar token
    const token = this.generateToken(user.id);

    const tokenInput = {
      userId: user.id,
      token: token,
      expiresAt: this.getExpirationDate(), 
    };

    await this.tokensRepository.insert(this.tokensRepository.create(tokenInput));

    return {
      id: user.id,
      name: user.fullName,
      email: user.email,
      token: token, 
    };
  }

  private generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET || 'default_secret'; 
    const token = jwt.sign({ id: userId }, secret, { expiresIn: '10m' }); 
    return token;
  }

  private getExpirationDate(): Date {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);
    return expirationDate;
  }
}
