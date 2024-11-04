import { Router } from 'express'
import { createOrderController } from '../controllers/create-order.controller'
import { readOrderController } from '../controllers/read-order.controller'
import { readOrdersController } from '../controllers/read-orders.controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { deleteOrderController } from '../controllers/delete-order.controller'
import { updateOrderController } from '../controllers/update-order.controller'
import { CarSchemaJoi, CustomerSchemaJoi } from '@/orders/utils/schemas'

const orderRoutes = Router()

orderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      car: CarSchemaJoi,
      customer: CustomerSchemaJoi
    },
  }),
  (req, res, next) => {
    createOrderController(req, res, next)
  },
)

orderRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().positive().optional(),
      per_page: Joi.number().positive().optional(),
      cep: Joi.string()
        .pattern(/^[0-9]{8}/)
        .length(8)
        .optional(),
      total: Joi.number().optional(),
      initialDate: Joi.date().optional(),
      finalDate: Joi.date().optional(),
      cancelDate: Joi.date().optional(),
      status: Joi.string().valid('Aberto', 'Aprovado', 'Cancelado').optional(),
      city: Joi.string().optional(),
      uf: Joi.string()
        .valid('AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE')
        .optional(),
      clientCpf: Joi.string().optional(),
    },
  }),
  (req, res, next) => {
    readOrdersController(req, res, next)
  },
)

orderRoutes.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  (req, res, next) => {
    readOrderController(req, res, next)
  },
)

orderRoutes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      cep: Joi.string()
        .pattern(/^[0-9]{8}/)
        .length(8)
        .optional(),
      total: Joi.number().optional(),
      initialDate: Joi.date().min('now').optional(),
      finalDate: Joi.date().optional(),
      cancelDate: Joi.date().optional(),
      status: Joi.string().valid('Aberto', 'Aprovado', 'Cancelado').optional(),
    },
  }),
  (req, res, next) => {
    updateOrderController(req, res, next)
  },
)

orderRoutes.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  (req, res, next) => {
    deleteOrderController(req, res, next)
  },
)

export { orderRoutes }
