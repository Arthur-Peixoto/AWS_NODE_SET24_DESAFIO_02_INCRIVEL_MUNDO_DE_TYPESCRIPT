import { Router } from 'express'
import { createUserController } from '@/users/infraestructure/http/controllers/create-user.controllers'
const userRoutes = Router()

userRoutes.post('/users/', (req, res) => {
  createUserController(req, res)
})

export { userRoutes }
