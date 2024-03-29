import { Router, Express, Request, Response } from 'express';
import { Image } from '../models/image.model';
import { response } from '../response';
import cloudinary from 'cloudinary';
import { FileUpload } from '../interfaces/images.interfaces';
import '../strategies/jwt';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { IUser } from '../models/user.model';


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

  router.get('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
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

  router.post('/', passport.authenticate('jwt', { session: false }), (req: any, res: Response) => {
    
    if(!req.files)
      response({ res: res, ok: false, status: 500, message: "Ha ocurrido un error):" })    

    const image: FileUpload = req.files.image;

    if(!image.mimetype.includes('image'))
        response({ res: res, ok: false, status: 500, message: 'El archivo subido no es una imagen'});
    
    
    cloudinary.v2.uploader.upload(image.tempFilePath, cloudinaryOptions, async (error, result) => {
      if(error){
        response({ res: res, ok: false, message: 'Ha ocurrido un error al subir la imagen):', status: 500 });
      }else{
        
        const newImage = {
          image: result?.secure_url,
          thumbnail: result?.eager[0].secure_url,
          asset_id: result?.asset_id,
          public_id: result?.public_id,
          width: result?.width,
          height: result?.height,
          user: req.user,
          created_at: result?.created_at
        }

        try{
          const imageDB = await Image.create(newImage);
          await imageDB.populate('user', '-password').execPopulate();
          response({ res: res, ok: true, status: 201, message: 'Imagen subida con exito', extra_data: imageDB });
        }catch(error){
          response({ res: res, ok: false, status: 500, message: 'Ha ocurrido un error al insertar la imagen'  });
        }
      }
    });
  });

  router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const { params: { id } } = req;
    const { body: { password } } = req;
    const imageToDelete = await Image.findOne({ _id: id });
    const public_id  = imageToDelete?.public_id || "";
    const currentUser = req.user as IUser;

    if(! await bcrypt.compare(password, currentUser.password))
      return response({ res: res, ok: false, status: 401, message: 'No estas autorizado para eliminar esta imagen' });
    
    try{
      await Image.deleteOne({ _id: id });
      cloudinary.v2.uploader.destroy(public_id, (error, result) => {
        if(error){
          console.error(error);
          response({ res: res, ok: false, status: 500, message: "Ha ocurrido un error):" });
        }else{
          response({ res: res, ok: true, status: 202, message: 'La imagen se ha eliminado exitosamente'});
        }
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