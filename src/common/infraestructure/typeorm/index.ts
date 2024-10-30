import { DataSource } from 'typeorm'
import { CreateCars1730228276828 } from './migrations/1730228276828-CreateCars'
import { CreateItems1730228906205 } from './migrations/1730228906205-CreateItems'
import { CreateUsers1730228906206 } from './migrations/1730250492317-CreateUsers'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'username',
  password: 'password',
  database: 'compasscar',
  port: 5432,
  migrations: [CreateCars1730228276828, CreateItems1730228906205, CreateUsers1730228906206],
  entities: [],
})
