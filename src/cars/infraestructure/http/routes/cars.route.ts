import { Router } from 'express'
import { createCarController } from '../controllers/create-car.controller'
import { readCarController } from '../controllers/read-car.controller'
import { updateCarController } from '../controllers/update-car.controller'
import { deleteCarController } from '../controllers/delete-car.controller'
import { readCarsController } from '../controllers/read-cars.controller'
import { celebrate, Joi, Segments } from 'celebrate'

const CURRENT_YEAR = new Date().getFullYear()
const carRoutes = Router()

carRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      model: Joi.string().required(),
      brand: Joi.string().required(),
      year: Joi.number()
        .integer()
        .min(CURRENT_YEAR - 11)
        .max(CURRENT_YEAR)
        .required(),
      licensePlate: Joi.string()
        .length(8)
        .pattern(/^[A-Za-z]{3}-[0-9]{4}$/)
        .required(),
      mileage: Joi.number().positive().required(),
      items: Joi.array().items(Joi.string()).max(5).unique().required(),
      price: Joi.number().positive().precision(2).required(),
      status: Joi.string().valid('ativo', 'inativo').required(),
    },
  }),
  (req, res) => {
    createCarController(req, res)
  },
)

carRoutes.get('/', (req, res) => {
  readCarsController(req, res)
})

carRoutes.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  (req, res) => {
    readCarController(req, res)
  },
)

carRoutes.patch('/:id', (req, res) => {
  updateCarController(req, res)
})

carRoutes.delete('/:id', (req, res) => {
  deleteCarController(req, res)
})

export { carRoutes }
