import { Router, Express, Request, Response } from 'express';
import { User } from '../models/user.model';
import { response } from '../response';

const usersApi = (app: Express) => {
  const router = Router();

  app.use('/api/users', router);

  router.get('', (req: Request, res: Response) => {
    res.status(200).send('Todo bien');
  });

  router.post('', async (req: Request, res: Response) => {
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