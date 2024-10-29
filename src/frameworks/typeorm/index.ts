import { DataSource } from 'typeorm'
import { CreateCars1730228276828 } from './migrations/1730228276828-CreateCars'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'username',
  password: 'password',
  database: 'compasscar',
  port: 5432,
  migrations: [CreateCars1730228276828],
  entities: [],
})
