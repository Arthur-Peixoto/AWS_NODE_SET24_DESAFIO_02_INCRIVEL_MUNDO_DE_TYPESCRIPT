import { carRoutes } from '@/cars/infraestructure/http/routes/cars.route'
import customerRouter from '@/modules/customer/infraestructure/http/routes/customer.route'
import { orderRoutes } from '@/orders/infrastructure/http/routes/orders.route'
import { userRoutes } from '@/users/infraestructure/http/routes/user.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/cars', carRoutes)
routes.use('/orders', orderRoutes)
routes.use('/customers', customerRouter)
export default routes
