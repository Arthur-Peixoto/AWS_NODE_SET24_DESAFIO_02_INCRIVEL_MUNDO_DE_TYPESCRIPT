import { z } from 'zod'

const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  car: z.any(),
})

export const CarSchema = z.object({
  id: z.string(),
  licensePlate: z.string(),
  brand: z.string(),
  model: z.string(),
  mileage: z.union([z.number(), z.null()]),
  year: z.number(),
  items: z.array(ItemSchema),
  price: z.number(),
  registrationDate: z.date(),
  status: z.enum(['ativo', 'inativo', 'excluído']),
})
