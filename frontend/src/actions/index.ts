import { User } from "../api/models/LoginResponse"

export const doLogin = (token: string, user:User) => {
  return {
    type: 'LOGIN',
    payload: {
      token,
      user
    }
  }
}