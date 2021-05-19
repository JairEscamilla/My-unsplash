import { Router, Express, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../models/user.model';
import { response } from '../response';
import jwt from 'jsonwebtoken';
import '../strategies/basic';
import { config } from '../config/index';

const usersApi = (app: Express) => {
  const router = Router();

  app.use('/api/users', router);

  router.get('', (req: Request, res: Response) => {
    res.status(200).send('Todo bien');
  });


  router.post('/sign_in', async (req: Request, res: Response, next: NextFunction) => {
    
    passport.authenticate('basic', function(error, user){
      console.log("pasa por aca");
      if(error || !user)
        response({ res: res, ok: false, status: 501, message: 'Credenciales incorrectas' });
      
      req.login(user, { session: false }, async function(error)  {
        if(error)
          response({ res: res, ok: false, status: 500, message: 'Ha ocurrido un error al autenticar al usuario' });
        
        const { username, email, profile_photo } = user;

        const payload = {
          email
        }

        const jwtSecret = `${config.jwtKey}`;

        const token = jwt.sign(payload, jwtSecret, {
          expiresIn: '1h'
        });

        response({ res: res, ok: true, status: 200, message: 'Inicio de sesión exitoso', extra_data: { user: { username, email, profile_photo }, token} });

      });
    })(req, res, next);
  });

  router.post('/sign_up', async (req: Request, res: Response) => {
    const { body } = req;
    try{
      const userCreated = await User.create(body);
      response({ res: res, ok: true, status: 201, message: 'Usuario creado con éxito', extra_data: userCreated });
    }catch(error){
      console.error(`Ha ocurrido un error: ${error}`);
      response({ res: res, ok: false, status: 500, message: 'Ha ocurrido un error al crear el usuario' });
    }
  });
}

export default usersApi;