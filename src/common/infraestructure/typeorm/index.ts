import { DataSource } from 'typeorm'
import { CreateCars1730228276828 } from './migrations/1730228276828-CreateCars'
import { CreateItems1730228906205 } from './migrations/1730228906205-CreateItems'
import { CreateOrders1730237813958 } from './migrations/1730237813958-CreateOrders'
import { CreateUsers1730228906206 } from './migrations/1730250492317-CreateUsers'
import { CreateTokens1730228906207 } from './migrations/1730251259678-CreateTokens'
import { Car } from '@/cars/infraestructure/typeorm/entities/cars.entity'
import { Item } from '@/cars/infraestructure/typeorm/entities/items.entity'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'compasscar',
  port: 5432,
  migrations: [
    CreateCars1730228276828,
    CreateItems1730228906205,
    CreateUsers1730228906206,
    CreateTokens1730228906207,
    CreateOrders1730237813958,
  ],
  entities: [Car, Item],
})


