export interface LoginResponse {
  ok: boolean;
  message: string;
  data: Data;
}

interface Data {
  user: User;
  token: string;
}

export interface User {
  username: string;
  email: string;
  profile_photo: string;
}