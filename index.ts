import express, { Response, Request } from 'express';
import { config } from './config';
import imagesApi from './routes/images';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import usersApi from './routes/users';
import { connectDB } from './config/db';
import { connectCloudinary } from './config/cloudinaryConfig';

const app = express();
const router = express.Router();


connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(router);

// Ruta principal
router.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Bienvenido a la API de MyUnsplash</h1>`);
});


// Conectando rutas
imagesApi(app);
usersApi(app);

// Iniciando servidor
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});