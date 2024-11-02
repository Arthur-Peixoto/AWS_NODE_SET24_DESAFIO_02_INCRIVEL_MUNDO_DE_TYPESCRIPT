import { Router } from 'express'
import { createOrderController } from '../controllers/create-order.controller'
import { readOrderController } from '../controllers/read-order.controller'

const orderRoutes = Router()

orderRoutes.post('/', (req, res) => {
    createOrderController(req, res)
})

orderRoutes.get('/:id', (req, res) => {
    readOrderController(req, res)
})

export {orderRoutes}