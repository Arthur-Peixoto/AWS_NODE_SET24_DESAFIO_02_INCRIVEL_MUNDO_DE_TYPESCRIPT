import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

  @CreateDateColumn()
  deletionDate: Date | null

}

export default Customer