export interface User {
  id: number
  name: string
  email: string
  registrationTimestamp: string
  lastLoginTimestamp: string
  status: 'blocked' | 'active'
}
