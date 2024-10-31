import { Router } from 'express'
import { createUserController } from '@/users/infraestructure/http/controllers/create-user.controllers'
import { listUsersController } from '../controllers/read-users.controller'
import { getUserByIdController } from '../controllers/read-single-user.controller'
const userRoutes = Router()

userRoutes.post('/users/', (req, res) => {
  createUserController(req, res)
})

userRoutes.get('/users/', (req, res) => {
  listUsersController(req, res);
});

userRoutes.get('/users/:id', (req, res) => {
  getUserByIdController(req, res);
});

userRoutes.put('/users/:id', (req, res) => {
  res.send('Update user')
});

export { userRoutes }
