import { Router, Express, Request, Response } from 'express';

const imagesApi = (app: Express) => {
  const router = Router();

  app.use('/api/images', router);

  router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      ok: true,
      message: 'Aqui vamos a listar las imagenes'
    })
  });
}

export default imagesApi;