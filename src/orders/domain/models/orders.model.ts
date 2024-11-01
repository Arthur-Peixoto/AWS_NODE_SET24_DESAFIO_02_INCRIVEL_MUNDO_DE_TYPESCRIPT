import { CarModel } from "@/cars/domain/models/cars.model"

export interface OrderModel {
    id: string
    cep: string
    city: string
    total: number
    initialDate: Date
    finalDate: Date
    cancelDate: Date
    // clients: ClientModel[]
    car: CarModel
    status: 'Aberto' | 'Aprovado' | 'Cancelado'
    uf: 'AC' | 'AL' | 'AM' | 'AP' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MG' | 'MS' | 'MT' | 'PA' | 'PB' | 'PE' | 'PI' | 'PR' | 'RJ' | 'RN' | 'RO' | 'RR' | 'RS' | 'SC' | 'SE' | 'SP' | 'TO'
}