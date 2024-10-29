import express from 'express'
import { dataSource } from '../typeorm'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running')
  })
})
