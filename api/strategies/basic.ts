import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';

const basicStrategy = async (email: string, password: string, cb: Function) => {
  try {
    const user = await User.findOne({ email: email });
    
    if(!user || ! await bcrypt.compare(password, user.password))
      return cb('Acceso denegado', false);

    return cb(null, user);
  }catch(error){
    return cb(error);
  }
}

passport.use(new BasicStrategy(basicStrategy));