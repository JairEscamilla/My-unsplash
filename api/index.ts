import express, { Response, Request } from 'express';
import { config } from './config';
import imagesApi from './routes/images';
import mongoose from 'mongoose';
const cloudinary = require('cloudinary').v2;

const app = express();
const router = express.Router();

// Conexion con la base de datos
const USER = config.dbuser;
const PASSWORD = config.dbpassword;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:/${config.dbName}?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (error) => {
  if(error){
    console.error('Ha ocurrido un error):');
    throw error;
  }
  console.log('La base de datos está conectada');
})

// Configuracion de cloudinary
cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret
});

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