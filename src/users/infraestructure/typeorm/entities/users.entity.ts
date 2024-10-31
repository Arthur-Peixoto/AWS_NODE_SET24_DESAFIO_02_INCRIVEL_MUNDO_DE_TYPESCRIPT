import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Car } from '@/cars/infraestructure/typeorm/entities/cars.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 100 })
  fullName: string

  @Column('varchar', { unique: true })
  email: string

  @Column('varchar')
  password: string

  @CreateDateColumn()
  registrationDate: Date

  @CreateDateColumn()
  deletionDate: Date | null

//   @OneToMany(() => Car, (car) => car.user)
//   cars: Car[] 
//isso aqui fica pra depois
}
