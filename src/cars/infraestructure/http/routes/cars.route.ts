import { Router } from 'express'
import { createCarController } from '../controllers/create-car.controller'
import { readCarController } from '../controllers/read-car.controller'
import { updateCarController } from '../controllers/update-car.controller'

const carRoutes = Router()

carRoutes.post('/', (req, res) => {
  createCarController(req, res)
})

carRoutes.get('/', (req, res) => {
  readCarController(req, res)
})

carRoutes.patch('/:id', (req, res) => {
  updateCarController(req, res)
})

export { carRoutes }
