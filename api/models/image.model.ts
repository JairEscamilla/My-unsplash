import { Schema, Document, model } from 'mongoose';

const imageSchema = new Schema({
  image: {
    type: String,
    required: [true, 'Debe existir una imagen']
  },

  thumbnail: {
    type: String,
  },

  asset_id: {
    type: String,
    required: [true, "El asset debe tener un id"]
  },

  public_id: {
    type: String,
    required: [true, "El asset debe tener un id publico"]
  },

  height: {
    type: Number,
    required: [true, "El asset debe tener una altura"]
  },

  width: {
    type: Number,
    required: [true, "El asset debe tener un ancho"]
  },

  created_at: {
    type: Date
  }
});

interface Iimages extends Document {
  image: string;
  thumbnail: string;
  asset_id: string,
  public_id: string;
  height: number;
  width: number;
  created_at: Date;
}


export const Image = model<Iimages>('Image', imageSchema);