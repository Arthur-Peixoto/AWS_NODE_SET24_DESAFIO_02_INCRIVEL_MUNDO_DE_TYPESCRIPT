import { carRoutes } from '@/cars/infraestructure/http/routes/cars.route'
import { orderRoutes } from '@/orders/infrastructure/http/routes/orders.route'
import { Router } from 'express'

const routes = Router()

routes.use('/cars', carRoutes)
routes.use('/orders', orderRoutes)

export default routes
