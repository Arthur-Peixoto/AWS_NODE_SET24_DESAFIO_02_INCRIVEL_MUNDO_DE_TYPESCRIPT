import { Router } from 'express'
import { createCustomerController } from '../controllers/create-customer.controller'

const customerRouter = Router()

customerRouter.post('/', (req, res, next) => {
  createCustomerController(req, res, next)
})

export default customerRouter
