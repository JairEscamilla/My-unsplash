import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '../config/index';
import { User } from '../models/user.model';


const strategyConfig = {
  secretOrKey: config.jwtKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(
  new Strategy(strategyConfig, async (tokenPayload, cb) => {
    try{
      const user = await User.findOne({ email: tokenPayload.email });
      if(!user)
        return cb("No estas autorizado para acceder a esta ruta", user);
      
      cb(null, {
        '_id': user._id,  
        username: user.username,
        email: user.email
      });
    }catch(error){
      cb(error);
    }
  })
);