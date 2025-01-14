import mongoose, { Schema, Document } from 'mongoose';

interface FoodDocument extends Document {
  name: string;
  benefit: string;
  type: 'good' | 'risky'; // Indicates whether it's a good or high-risk food
  image: string;
}

const FoodSchema = new Schema<FoodDocument>(
  {
    name: { type: String, required: true },
    benefit: { type: String, required: true },
    type: { type: String, enum: ['good', 'risky'], required: true },
    image: { type: String, required: true } // URL from Cloudinary
  },
  { timestamps: true }
);

export const Food = mongoose.model<FoodDocument>('Food', FoodSchema);
