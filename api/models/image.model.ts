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

imageSchema.pre<Iimages>('save', function(next){
  this.created_at = new Date();
  // Aqui es donde voy a generar el thumbnail
  next();
});

export const Image = model<Iimages>('Image', imageSchema);