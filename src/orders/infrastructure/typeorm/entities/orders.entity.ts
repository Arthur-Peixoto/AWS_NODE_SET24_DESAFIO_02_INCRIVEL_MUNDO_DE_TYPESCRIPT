import { Car } from '@/cars/infraestructure/typeorm/entities/cars.entity'
import { Customer } from '@/modules/customer/typeorm/entities/customer.entity'
import { OrderModel } from '@/orders/domain/models/orders.model'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

// import { CLient } from '../../clients/domain/clients.entity'

@Entity('orders')
export class Order implements OrderModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  cep: string | null

  @Column({ nullable: true })
  city: string | null

  @Column({ type: 'decimal', default: 0 })
  total: number

  @Column({ nullable: true })
  initialDate: Date | null

  @Column({ nullable: true })
  finalDate: Date | null

  @Column({ nullable: true })
  cancelDate: Date | null

  @Column({
    type: 'enum',
    enum: ['Aberto', 'Aprovado', 'Cancelado'],
    nullable: true,
  })
  status: 'Aberto' | 'Aprovado' | 'Cancelado' | null

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  })
  uf: 'AL' | 'BA' | 'CE' | 'MA' | 'PB' | 'PE' | 'PI' | 'RN' | 'SE' | null

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer

  @OneToOne(() => Car)
  @JoinColumn()
  car: Car
}
