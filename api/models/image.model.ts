import { Schema, Document, model } from 'mongoose';

const imageSchema = new Schema({
  image: {
    type: String,
    required: [true, 'Debe existir una imagen']
  },

  thumbnail: {
    type: String,
  },

  created_at: {
    type: Date
  }
});

interface Iimages extends Document {
  image: string;
  thumbnail: string;
  created_at: Date;
}


export const Image = model<Iimages>('Image', imageSchema);