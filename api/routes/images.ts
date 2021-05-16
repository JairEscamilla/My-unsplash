import { Router, Express, Request, Response } from 'express';
import { Image } from '../models/image.model';
import { response } from '../response';

const imagesApi = (app: Express) => {
  const router = Router();

  app.use('/api/images', router);

  router.get('/', async (req: Request, res: Response) => {
    const { query: { page } } = req;
    let pagina = Number(page) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const images = await Image.find()
                              .sort({ _id: -1 })
                              .skip(skip)
                              .limit(10)
                              .exec();
    response({
      res: res,
      ok: true,
      status: 200,
      message: 'Listado de imagenes',
      extra_data: images
    });
  });

  router.post('/', (req: Request, res: Response) => {
    const { body } = req;
    
    Image.create( body ).then(imageDB => {
      response({
        res: res,
        ok: true,
        status: 200,
        message: "Se ha creado con exito el recurso",
        extra_data: imageDB
      })
    })
    .catch(error => {
      console.error(error);
      response({
        res: res,
        ok: false,
        status: 500,
        message: "Ha ocurrido un error):"
      })
    });

  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const { params: { id } } = req;

    try{
      await Image.deleteOne({ _id: id });
      response({
        res: res,
        ok: true,
        status: 202,
        message: 'La imagen se ha eliminado exitosamente'
      });
    }catch(error){
      console.error(`Ha ocurrido un error: ${error}`);
      response({
        res: res,
        ok: false,
        status: 500,
        message: 'No se ha podido eliminar la imagen'
      });
    }

  })
}

export default imagesApi;