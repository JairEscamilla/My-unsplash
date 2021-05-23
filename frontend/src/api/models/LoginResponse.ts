export interface LoginResponse {
  ok: boolean;
  message: string;
  data: Data;
}

interface Data {
  user: User;
  token: string;
}

interface User {
  username: string;
  email: string;
  profile_photo: string;
}