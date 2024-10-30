import { carRoutes } from '@/cars/infraestructure/http/routes/cars.route'
import { Router } from 'express'

const routes = Router()

routes.use('/cars', carRoutes)

export default routes
