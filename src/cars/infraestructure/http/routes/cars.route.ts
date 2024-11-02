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

carRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().positive().optional(),
      per_page: Joi.number().positive().optional(),
      model: Joi.string().optional(),
      brand: Joi.string().optional(),
      untilYear: Joi.number()
        .positive()
        .optional()
        .when('fromYear', {
          is: Joi.number().positive().required(),
          then: Joi.number().positive().greater(Joi.ref('fromYear')),
        }),
      fromYear: Joi.number().positive().optional(),
      minPrice: Joi.number().precision(2).positive().optional(),
      maxPrice: Joi.number()
        .precision(2)
        .positive()
        .optional()
        .when('minPrice', {
          is: Joi.number().precision(2).required(),
          then: Joi.number().greater(Joi.ref('minPrice')),
        }),
      items: Joi.array().items(Joi.string()).max(5).unique().optional(),
      mileage: Joi.number().positive().optional(),
      licensePlateFinalDigits: Joi.string()
        .length(4)
        .pattern(/^[0-9]{4}$/)
        .optional(),
      status: Joi.string().valid('ativo', 'inativo').optional(),
    },
  }),
  (req, res) => {
    readCarsController(req, res)
  },
)

carRoutes.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  (req, res) => {
    readCarController(req, res)
  },
)

carRoutes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      model: Joi.string().optional(),
      brand: Joi.string().optional(),
      year: Joi.number()
        .integer()
        .min(CURRENT_YEAR - 11)
        .max(CURRENT_YEAR)
        .optional(),
      licensePlate: Joi.string()
        .length(8)
        .pattern(/^[A-Za-z]{3}-[0-9]{4}$/)
        .optional(),
      mileage: Joi.number().positive().optional(),
      items: Joi.array().items(Joi.string()).max(5).unique().optional(),
      price: Joi.number().positive().precision(2).optional(),
      status: Joi.string().valid('ativo', 'inativo').optional(),
    },
  }),
  (req, res) => {
    updateCarController(req, res)
  },
)

carRoutes.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  (req, res) => {
    deleteCarController(req, res)
  },
)

export { carRoutes }
