export interface UserModel {
    id: string
    fullName: string
    email: string
    password: string
    registrationDate: Date
    deletionDate?: Date | null 
  }
  