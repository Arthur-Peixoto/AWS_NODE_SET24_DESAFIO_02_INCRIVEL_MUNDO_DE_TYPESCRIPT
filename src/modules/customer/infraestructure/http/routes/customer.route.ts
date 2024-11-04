import { Router } from 'express'
import { createCustomerController } from '../controllers/create-customer.controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { readCustomerController } from '../controllers/read-costumer.controller'
import { updateCustomerController } from '../controllers/update-customer.controller'
import isAuthenticated from '@/common/domain/errors/is-authenticated'

const customerRouter = Router()

customerRouter.use(isAuthenticated)

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required(),
      dateBirth: Joi.date().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  (req, res, next) => {
    createCustomerController(req, res, next)
  },
)

customerRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  (req, res, next) => {
    readCustomerController(req, res, next)
  },
)

customerRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().optional(),
      dateBirth: Joi.date().optional(),
      email: Joi.string().email().optional(),
      cpf: Joi.string().optional(),
      phone: Joi.string().optional(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  (req, res, next) => {
    updateCustomerController(req, res, next)
  },
)

export default customerRouter
