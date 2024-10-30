import { OrderModel } from "@/orders/domain/models/orders.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    status: "Aberto" | "Aprovado" | "Cancelado"

    @Column('uf_enum')
    uf: "AC" | "AL" | "AM" | "AP" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA" | "MG" | "MS" | "MT" | "PA" | "PB" | "PE" | "PI" | "PR" | "RJ" | "RN" | "RO" | "RR" | "RS" | "SC" | "SE" | "SP" | "TO"
}