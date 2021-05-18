import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'El username es requerido']
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es requerido']
  },

  password: {
    type: String,
    required: [true, 'Es necesario tener una contraseña']
  },

  profile_photo: {
    type: String,
    default: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
  }
});

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile_photo: string;
}

userSchema.pre<IUser>('save', function(next){
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export const User = model<IUser>('User', userSchema);