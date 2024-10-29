import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'username',
  password: 'password',
  database: 'compasscar',
  port: 5432,
  migrations: [],
  entities: [],
})
