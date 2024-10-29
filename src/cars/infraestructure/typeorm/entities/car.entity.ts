import { CarModel } from '@/cars/domain/models/car.model'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

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
}
