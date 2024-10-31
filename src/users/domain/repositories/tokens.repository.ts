import { RepositoryInterface } from '@/common/domain/repositories/repository.interface';
import { TokenModel } from '../models/token.model';

export type CreateTokenProps = {
  userId: string;
  token: string;
  expiresAt?: Date | null;
};

export interface TokenRepository extends RepositoryInterface<TokenModel, CreateTokenProps> {
    findByToken(token: string): Promise<TokenModel | null>;
    findByUserId(userId: string): Promise<TokenModel | null>;
    }