import cloudinary from 'cloudinary';
import { config } from './index';

export const connectCloudinary = () => {
  // Configuracion de cloudinary
  cloudinary.v2.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
  });
}
