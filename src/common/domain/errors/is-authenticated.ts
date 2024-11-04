import { NextFunction, Request, Response } from 'express'
import { verify, Secret } from 'jsonwebtoken'
import { AppError } from '../errors/app-error'
import authConfig from '@/config/auth'

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('Token JWT está ausente.', 401)
  }

  // tem qeu ser "Bearer <token>"
  const [, token] = authHeader.split(' ')

  try {
    // request.body = {
    //   id: sub,
    // }
    return next()
  } catch (error) {
    throw new AppError('Token JWT inválido ou expirado.', 401) //401 ou 403?
  }
}
