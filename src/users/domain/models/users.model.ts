export interface UserModel {
  id: string
  full_name: string
  email: string
  password: string
  created_at: Date
  deleted_at?: Date | null
}
