import { Router } from 'express'
import { createOrderController } from '../controllers/create-order.controller'
import { readOrderController } from '../controllers/read-order.controller'
// import { readOrdersController } from '../controllers/read-orders.controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { deleteOrderController } from '../controllers/delete-order.controller'

const orderRoutes = Router()

orderRoutes.post('/', (req, res) => {
    createOrderController(req, res)
})

// orderRoutes.get('/', (req, res) => {
//     readOrdersController(req, res)
// })

orderRoutes.get('/:id', (req, res) => {
    readOrderController(req, res)
})

orderRoutes.delete(
    '/:id',
    celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    (req, res, next) => {
      deleteOrderController(req, res, next)
    },
  )

export {orderRoutes}