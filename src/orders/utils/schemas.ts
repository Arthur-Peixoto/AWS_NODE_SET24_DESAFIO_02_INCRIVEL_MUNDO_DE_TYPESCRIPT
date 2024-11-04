import Joi from 'joi'
import { z } from 'zod'

// const ItemSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   car: z.any(),
// })

export const CarSchemaZod = z.object({
  id: z.string(),
  licensePlate: z.string(),
  brand: z.string(),
  model: z.string(),
  mileage: z.union([z.number(), z.null()]),
  year: z.number(),
  items: z.array(z.string()),
  price: z.number(),
  registrationDate: z.string(),
  status: z.enum(['ativo', 'inativo', 'excluído']),
})

export const CarSchemaJoi = Joi.object({
  id: Joi.string().required(),
  licensePlate: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  mileage: Joi.number().optional(),
  year: Joi.number().required(),
  items: Joi.array().items(Joi.string()),
  price: Joi.number().required(),
  registrationDate: Joi.string().required(),
  status: Joi.valid('ativo', 'inativo', 'excluído').required(),
})

export type carModelInput = {
  id: string
  model: string
  brand: string
  licensePlate: string
  mileage?: number
  year: number
  items: string[]
  price: number
  status: 'ativo' | 'inativo' | 'excluído'
  registrationDate: Date
}