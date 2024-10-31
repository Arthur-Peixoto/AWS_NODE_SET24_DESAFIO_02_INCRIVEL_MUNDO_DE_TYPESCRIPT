import { Router } from 'express'
import { createUserController } from '@/users/infraestructure/http/controllers/create-user.controllers'
import { listUsersController } from '../controllers/read-users.controller'
const userRoutes = Router()

userRoutes.post('/users/', (req, res) => {
  createUserController(req, res)
})

userRoutes.get('/users/', (req, res) => {
  listUsersController(req, res);
});

export { userRoutes }
