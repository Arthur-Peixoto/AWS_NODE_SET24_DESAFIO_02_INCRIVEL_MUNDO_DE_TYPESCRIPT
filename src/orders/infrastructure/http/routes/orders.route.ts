import { Router } from 'express'
import { createOrderController } from '../controllers/create-order.controller'

const orderRoutes = Router()

orderRoutes.post('/', (req, res) => {
    createOrderController(req, res)
})

export {orderRoutes}