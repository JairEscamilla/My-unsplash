import { Router, Express, Request, Response } from 'express';
import { Image } from '../models/image.model';

const imagesApi = (app: Express) => {
  const router = Router();

  app.use('/api/images', router);

  router.get('/', async (req: Request, res: Response) => {
    const images = await Image.find();

    res.status(200).json({
      ok: true,
      message: 'Listado de imagenes',
      images
    });
  });

  router.post('/', (req: Request, res: Response) => {
    const { body } = req;
    
    Image.create( body ).then(imageDB => {
      console.log("Pasamos por aqui");
      res.status(200).json({
        ok: true,
        mesage: "Usuario creado con éxito",
        image: imageDB
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: "Ha ocurrido un error al guardar la imagen):"
      })
    });

  })
}

export default imagesApi;