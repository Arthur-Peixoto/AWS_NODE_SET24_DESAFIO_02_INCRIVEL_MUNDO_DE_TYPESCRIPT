import { CarModel } from '@/cars/domain/models/car.model'
import { ItemModel } from '@/cars/domain/models/item.model'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Item } from './item.entity'

@Entity('cars')
export class Car implements CarModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  licensePlate: string

  @Column('varchar')
  brand: string

  @Column('varchar')
  model: string

  @Column('int')
  mileage?: number

  @Column('int')
  year: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @CreateDateColumn({ name: 'registrationDate' })
  registrationDate: Date

  @Column({ type: 'enum', enum: ['ativo', 'inativo', 'excluído'] })
  status: 'ativo' | 'inativo' | 'excluído'

  @OneToMany((type) => Item, (item) => item.car)
  items: ItemModel[]
}
