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

  @Column('varchar')
  cep: string

  @Column('varchar')
  city: string

  @Column('decimal')
  total: number

  @Column('timestamp')
  initialDate: Date

  @Column('timestamp')
  finalDate: Date

  @Column('timestamp')
  cancelDate: Date

  @Column('status_enum')
  status: 'Aberto' | 'Aprovado' | 'Cancelado'

  @Column('uf_enum')
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

  // @ManyToOne(() => Client, (client) => client.orders)
  // client: Client
  @OneToOne(() => Car)
  @JoinColumn()
  car: Car
}
