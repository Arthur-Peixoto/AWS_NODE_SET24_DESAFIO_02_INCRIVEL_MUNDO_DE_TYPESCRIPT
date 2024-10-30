import { CarModel } from '@/cars/domain/models/cars.model'
import { ItemModel } from '@/cars/domain/models/items.model'
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Car } from './cars.entity'

@Entity('items')
export class Item implements ItemModel {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column('varchar')
  name: string
  @ManyToOne((type) => Car, (car) => car.items)
  car: CarModel
}
