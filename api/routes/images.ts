import { Router, Express, Request, Response } from 'express';
import { Image } from '../models/image.model';
import { response } from '../response';
import cloudinary from 'cloudinary';
import { FileUpload } from '../interfaces/images.interfaces';



const cloudinaryOptions = {
  folder: 'uploads/',
  unique_filename: true,
  overwrite: false,
  eager: [
    {
      width: 5,
      height: 5,
      crop: 'fill'
    }
  ]
}

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

  router.post('/', (req: any, res: Response) => {
    
    if(!req.files)
      response({
        res: res,
        ok: false,
        status: 500,
        message: "Ha ocurrido un error):"
      })    

    const image: FileUpload = req.files.image;

    if(!image.mimetype.includes('image'))
        response({
          res: res,
          ok: false,
          status: 500,
          message: 'El archivo subido no es una imagen'
        });
    
    
    cloudinary.v2.uploader.upload(image.tempFilePath, cloudinaryOptions, async (error, result) => {
      if(error){
        response({
          res: res,
          ok: false,
          message: 'Ha ocurrido un error al subir la imagen):',
          status: 500
        });
      }else{
        const newImage = {
          image: result?.secure_url,
          thumbnail: result?.eager[0].secure_url,
          created_at: result?.created_at
        }

        const imageDB = await Image.create(newImage);
        response({
          res: res,
          ok: true,
          status: 201,
          message: 'Imagen subida con exito',
          extra_data: imageDB
        });
      }
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