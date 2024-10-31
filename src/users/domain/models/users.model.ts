export interface UserModel {
    id: string
    fullName: string
    email: string
    password: string  //tem que cripotgrafaaaaaaaaaaaaaaaaaaaaaaaar
    registrationDate: Date
    deletionDate?: Date | null 
  }
  