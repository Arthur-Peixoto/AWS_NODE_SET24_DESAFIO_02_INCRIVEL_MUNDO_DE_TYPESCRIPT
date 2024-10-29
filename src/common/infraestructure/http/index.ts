import express from 'express'
import { dataSource } from '../typeorm'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running')
  })
})
