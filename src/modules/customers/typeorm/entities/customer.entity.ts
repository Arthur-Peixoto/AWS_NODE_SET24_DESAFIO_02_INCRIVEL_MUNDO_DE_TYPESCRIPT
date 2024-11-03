import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('customers')
export class Customers {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 100 })
  fullName: string

  @Column('varchar', { unique: true })
  email: string

  @Column()
  dateBirth:Date

  @Column('number', { unique: true })
  cpf: number

  @CreateDateColumn()
  registrationDate: Date

  @CreateDateColumn()
  deletionDate: Date | null

}

export default Customers