import { Car } from '@/cars/infraestructure/typeorm/entities/cars.entity'
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

  @Column({type: 'decimal', default: 0})
  total: number

  @Column({ nullable: true })
  initialDate: Date | null

  @Column({ nullable: true })
  finalDate: Date | null

  @Column({ nullable: true })
  cancelDate: Date | null

  @Column({ type: 'enum', enum: ['Aberto', 'Aprovado', 'Cancelado'], nullable: true })
  status: 'Aberto' | 'Aprovado' | 'Cancelado' | null

  @Column({
    nullable: true,
    type: 'enum',
    enum: [
      'AC',
      'AL',
      'AM',
      'AP',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MG',
      'MS',
      'MT',
      'PA',
      'PB',
      'PE',
      'PI',
      'PR',
      'RJ',
      'RN',
      'RO',
      'RR',
      'RS',
      'SC',
      'SE',
      'SP',
      'TO',
    ],
  })
  uf:
    | 'AC'
    | 'AL'
    | 'AM'
    | 'AP'
    | 'BA'
    | 'CE'
    | 'DF'
    | 'ES'
    | 'GO'
    | 'MA'
    | 'MG'
    | 'MS'
    | 'MT'
    | 'PA'
    | 'PB'
    | 'PE'
    | 'PI'
    | 'PR'
    | 'RJ'
    | 'RN'
    | 'RO'
    | 'RR'
    | 'RS'
    | 'SC'
    | 'SE'
    | 'SP'
    | 'TO'
    | null
  // @ManyToOne(() => Client, (client) => client.orders)
  // client: Client
  @OneToOne(() => Car)
  @JoinColumn()
  car: Car
}
