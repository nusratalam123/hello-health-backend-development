import mongoose, { Schema, Document } from 'mongoose';

interface FoodAnalysisDocument extends Document {
    imageUrl: string;
    food: string;
    confidence: number
    suitability: string;
    uploadedAt?: Date;
}

const FoodAnalysisSchema = new Schema<FoodAnalysisDocument>(
  {
    imageUrl: { type: String, required: true },
    food: { type: String, required: true },
    confidence: { type: Number, required: true },
    suitability: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const FoodAnalysis = mongoose.model<FoodAnalysisDocument>('FoodAnalysis', FoodAnalysisSchema);
