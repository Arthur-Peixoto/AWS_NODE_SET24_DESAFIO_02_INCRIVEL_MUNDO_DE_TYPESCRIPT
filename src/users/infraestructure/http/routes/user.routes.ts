import { Router } from 'express'
import { createUserController } from '@/users/infraestructure/http/controllers/create-user.controllers'
import { listUsersController } from '../controllers/read-users.controller'
import { getUserByIdController } from '../controllers/read-single-user.controller'
import { updateUserController } from '../controllers/update-user.controller'
import { deleteUserController } from '../controllers/delete-user.controller'
import { loginUserController } from '../controllers/login.controller'
import isAuthenticated from '@/common/domain/errors/is-authenticated'
const userRoutes = Router()


userRoutes.post('/users/', isAuthenticated,(req, res, next) => {
  createUserController(req, res, next)
})

userRoutes.get('/users/', isAuthenticated,(req, res, next) => {
  listUsersController(req, res, next);
});

userRoutes.get('/users/:id', isAuthenticated,(req, res, next) => {
  getUserByIdController(req, res, next);
});

userRoutes.put('/users/:id', isAuthenticated,(req, res, next) => {
  updateUserController(req, res, next);
});

userRoutes.delete('/users/:id', isAuthenticated,(req, res, next) => {
  deleteUserController(req, res, next);
});

userRoutes.post('/signup', (req, res, next) => {
  loginUserController(req, res, next);
});

export { userRoutes }
