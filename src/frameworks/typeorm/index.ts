import { DataSource } from 'typeorm'
import { CreateCars1730228276828 } from './migrations/1730228276828-CreateCars'
import { CreateItems1730228906205 } from './migrations/1730228906205-CreateItems'
import { CreateOrders1730237813958 } from './migrations/1730237813958-CreateOrders'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'kaio0510',
  database: 'compasscar',
  port: 5432,
  migrations: [CreateCars1730228276828, CreateItems1730228906205, CreateOrders1730237813958],
  entities: [],
})
