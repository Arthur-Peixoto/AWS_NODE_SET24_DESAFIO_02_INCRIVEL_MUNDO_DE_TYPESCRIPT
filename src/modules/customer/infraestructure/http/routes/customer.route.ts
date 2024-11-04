import { Router } from 'express'
import { createCustomerController } from '../controllers/create-customer.controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { readCustomerController } from '../controllers/read-costumer.controller'

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

customerRouter.get('/:id', (req, res, next) => {
  readCustomerController(req, res, next)
})

export default customerRouter
