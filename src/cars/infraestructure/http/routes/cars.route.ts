import { Router } from 'express'
import { createCarController } from '../controllers/create-car.controller'

const carRoutes = Router()

carRoutes.post('/', (req, res) => {
  createCarController(req, res)
})

export { carRoutes }
