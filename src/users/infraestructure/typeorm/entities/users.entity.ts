import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 100 })
  full_name: string

  @Column('varchar', { unique: true })
  email: string

  @Column('varchar')
  password: string

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  deleted_at: Date | null

  //   @OneToMany(() => Car, (car) => car.user)
  //   cars: Car[]
  //isso aqui fica pra depois
}
