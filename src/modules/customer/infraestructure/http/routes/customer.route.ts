import { Router } from 'express'
import { createCustomerController } from '../controllers/create-customer.controller'
import { celebrate, Joi, Segments } from 'celebrate'

const customerRouter = Router()

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

export default customerRouter
