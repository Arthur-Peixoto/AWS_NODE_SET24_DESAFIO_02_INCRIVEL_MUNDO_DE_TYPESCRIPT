import { ItemModel } from './item.model'

export interface CarModel {
  id: string
  licensePlate: string
  brand: string
  model: string
  mileage?: number | null
  year: number
  items: ItemModel[]
  price: number
  registrationDate: Date
  status: 'ativo' | 'inativo' | 'excluído'
}
