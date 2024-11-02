// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { dataSource } from '../typeorm'
import routes from './routes'
import { AppError } from '@/common/domain/errors/app-error'
import { errors } from 'celebrate'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(errors())

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    console.log(error)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running')
  })
})
