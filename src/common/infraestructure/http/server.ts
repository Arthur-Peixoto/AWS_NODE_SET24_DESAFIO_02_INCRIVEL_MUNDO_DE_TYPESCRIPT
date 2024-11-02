import express from 'express'
import 'express-async-errors'
import { dataSource } from '../typeorm'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next)
})

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running')
  })
})
