import { Router } from 'express'
import { createCarController } from '../controllers/create-car.controller'
import { readCarController } from '../controllers/read-car.controller'
import { updateCarController } from '../controllers/update-car.controller'
import { deleteCarController } from '../controllers/delete-car.controller'

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

carRoutes.delete('/:id', (req, res) => {
  deleteCarController(req, res)
})

export { carRoutes }
