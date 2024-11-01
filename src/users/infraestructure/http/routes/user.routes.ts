import { Router } from 'express'
import { createUserController } from '@/users/infraestructure/http/controllers/create-user.controllers'
import { listUsersController } from '../controllers/read-users.controller'
import { getUserByIdController } from '../controllers/read-single-user.controller'
import { updateUserController } from '../controllers/update-user.controller'
import { deleteUserController } from '../controllers/delete-user.controller'
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
  updateUserController(req, res);
});

userRoutes.delete('/users/:id', (req, res) => {
  deleteUserController(req, res);
});



export { userRoutes }
