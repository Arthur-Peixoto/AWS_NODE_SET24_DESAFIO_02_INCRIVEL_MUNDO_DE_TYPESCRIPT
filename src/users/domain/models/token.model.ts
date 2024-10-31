export interface TokenModel {
    id: string;
    userId: string; 
    token: string;
    createdAt: Date;
    expiresAt?: Date | null; 
  }
  