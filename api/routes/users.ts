import { Router, Express, Request, Response } from 'express';

const usersApi = (app: Express) => {
  const router = Router();

  app.use('/api/users', router);

  router.get('', (req: Request, res: Response) => {
    res.status(200).send('Todo bien');
  });
}

export default usersApi;