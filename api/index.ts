import express, { Response, Request } from 'express';
import { config } from './config';
import imagesApi from './routes/images';

const app = express();
const router = express.Router();

// Middlewares
app.use(express.json());
app.use(router);

// Ruta principal
router.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Bienvenido a la API de MyUnsplash</h1>`);
});


// Conectando rutas
imagesApi(app);

// Iniciando servidor
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});