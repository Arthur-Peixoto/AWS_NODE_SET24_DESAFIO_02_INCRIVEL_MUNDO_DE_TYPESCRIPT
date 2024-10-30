import { DataSource } from 'typeorm'
import { CreateCars1730228276828 } from './migrations/1730228276828-CreateCars'
import { CreateItems1730228906205 } from './migrations/1730228906205-CreateItems'
import { Car } from '@/cars/infraestructure/typeorm/entities/cars.entity'
import { Item } from '@/cars/infraestructure/typeorm/entities/items.entity'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'username',
  password: 'password',
  database: 'compasscar',
  port: 5432,
  migrations: [CreateCars1730228276828, CreateItems1730228906205],
  entities: [Car, Item],
})
