export interface CustomerModel {
  id: string
  fullName: string
  dateBirth: Date
  email: string
  cpf: string
  phone: string
  registrationDate: Date
  deletionDate?: Date | null 
}