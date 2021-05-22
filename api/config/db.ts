import mongoose from 'mongoose';
import { config } from './index';

export const connectDB = () => {
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
}
