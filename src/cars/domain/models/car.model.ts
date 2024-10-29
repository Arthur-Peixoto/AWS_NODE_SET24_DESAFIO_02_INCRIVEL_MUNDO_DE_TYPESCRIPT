export interface CarModel {
  id: string
  licensePlate: string
  brand: string
  model: string
  mileage?: number | null
  year: number
  // items: Item[],
  price: number
  registrationDate: Date
  status: 'ativo' | 'inativo' | 'excluído'
}
