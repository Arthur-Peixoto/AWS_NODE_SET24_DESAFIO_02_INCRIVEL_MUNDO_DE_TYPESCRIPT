import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 100 })
  fullName: string

  @Column('varchar', { unique: true })
  email: string

  @Column('varchar', { length: 11 })
  phone: string

  @Column()
  dateBirth: Date

  @Column('varchar', { unique: true })
  cpf: string

  @CreateDateColumn()
  registrationDate: Date

  @CreateDateColumn({ type: 'timestamp', nullable: true, default: null })
  deleted_at: Date | null
}

export default Customer
