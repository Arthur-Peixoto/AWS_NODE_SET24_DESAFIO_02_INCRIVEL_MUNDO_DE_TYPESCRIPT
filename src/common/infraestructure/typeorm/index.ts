import { Car } from '@/cars/infraestructure/typeorm/entities/cars.entity'
import { Item } from '@/cars/infraestructure/typeorm/entities/items.entity'
import Customer from '@/modules/customer/infraestructure/typeorm/entities/customer.entity'
import { Order } from '@/orders/infrastructure/typeorm/entities/orders.entity'
import { DataSource } from 'typeorm'
import { CreateCars1730228276828 } from './migrations/1730228276828-CreateCars'
import { CreateItems1730228906205 } from './migrations/1730228906205-CreateItems'
import { CreateOrders1730237813958 } from './migrations/1730237813958-CreateOrders'
import { CreateUsers1730228906206 } from './migrations/1730250492317-CreateUsers'
import { CreateTokens1730228906207 } from './migrations/1730251259678-CreateTokens'
import { CreateCustomers1730485886879 } from './migrations/1730485886879-CreateCustomers'
import { ChangeTypeOfPrice1730489667223 } from './migrations/1730489667223-changeTypeOfPrice'
import { SeedUsers1730657179163 } from './migrations/1730657179163-SeedUsers'
import { User } from '@/users/infraestructure/typeorm/entities/users.entity'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  database: 'compasscar',
  port: 5432,
  migrations: [
    CreateCars1730228276828,
    CreateItems1730228906205,
    CreateUsers1730228906206,
    CreateCustomers1730485886879,
    CreateTokens1730228906207,
    CreateOrders1730237813958,
    ChangeTypeOfPrice1730489667223,
    SeedUsers1730657179163,
  ],
  synchronize: true,
  entities: [Car, Item, Order, Customer, User],
})
