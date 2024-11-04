import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { createUserController } from '@/users/infraestructure/http/controllers/create-user.controllers';
import { listUsersController } from '../controllers/read-users.controller';
import { getUserByIdController } from '../controllers/read-single-user.controller';
import { updateUserController } from '../controllers/update-user.controller';
import { deleteUserController } from '../controllers/delete-user.controller';
import { loginUserController } from '../controllers/login.controller';
import isAuthenticated from '@/common/domain/errors/is-authenticated';

const userRoutes = Router();

userRoutes.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
      createdAt: Joi.date().optional(),
      deletedAt: Joi.date().allow(null),
    },
  }),
  (req, res, next) => {
    createUserController(req, res, next);
  }
);

userRoutes.get(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().positive().optional(),
      per_page: Joi.number().positive().optional(),
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      excluded: Joi.boolean().optional(),
      orderBy: Joi.array()
        .items(Joi.string().valid('fullName', 'createdAt', 'deletedAt'))
        .max(3)
        .optional(),
    },
  }),
  (req, res, next) => {
    listUsersController(req, res, next);
  }
);

userRoutes.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (req, res, next) => {
    getUserByIdController(req, res, next);
  }
);

userRoutes.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      fullName: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(4).optional(),
    },
  }),
  (req, res, next) => {
    updateUserController(req, res, next);
  }
);

userRoutes.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (req, res, next) => {
    deleteUserController(req, res, next);
  }
);

userRoutes.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    },
  }),
  (req, res, next) => {
    loginUserController(req, res, next);
  }
);

export { userRoutes };
