import express, { Response, Request } from 'express';
import { config } from './config';
import imagesApi from './routes/images';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import usersApi from './routes/users';
import { connectDB } from './config/db';
import { connectCloudinary } from './config/cloudinaryConfig';
import path from 'path';
const app = express();


connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));


// Conectando rutas
imagesApi(app);
usersApi(app);



if(config.nodeEnv === 'production'){
  
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}else{
    // Ruta principal
  app.get('/', (req: Request, res: Response) => {
    res.send(`<h1>Bienvenido a la API de MyUnsplash</h1>`);
  });
}
// Iniciando servidor
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});