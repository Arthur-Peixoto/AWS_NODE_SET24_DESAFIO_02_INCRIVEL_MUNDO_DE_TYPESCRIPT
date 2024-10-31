import { TokenRepository } from '@/users/domain/repositories/tokens.repository'; // Importando a interface do repositório
import { Token } from '../entities/tokens.entity'; // Importando a entidade Token
import { Repository } from 'typeorm';
import { TokenModel } from '@/users/domain/models/token.model';

export class TokensTypeormRepository implements TokenRepository {
  constructor(private tokenRepository: Repository<Token>) {}
    findByToken(token: string): Promise<TokenModel | null> {
        throw new Error('Method not implemented.');
    }
    findByUserId(userId: string): Promise<TokenModel | null> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<TokenModel> {
        throw new Error('Method not implemented.');
    }
    update(model: TokenModel): Promise<TokenModel> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

  create(token: Partial<Token>): Token {
    return this.tokenRepository.create(token);
  }

  async insert(token: Token): Promise<Token> {
    return await this.tokenRepository.save(token);
  }
}
