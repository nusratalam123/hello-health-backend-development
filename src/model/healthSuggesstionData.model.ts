import mongoose, { Schema, Document } from 'mongoose';

interface HealthSuggestionDataDocument extends Document {
  userID: unknown;
  age: number;
  cholesterol: number;
  bloodPressure: string;
  normalBloodPressure: string;
  diabetes: number;
  smoking: boolean;
  kidneyDisease: boolean;
  temperature: number;
  heartRate: number;
  condition: 'good' | 'moderate' | 'bad';
  feedback: string[];
}

const HealthSuggestionDataSchema = new Schema<HealthSuggestionDataDocument>(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    age: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    bloodPressure: { type: String, required: true },
    normalBloodPressure: { type: String, required: true },
    diabetes: { type: Number, required: true },
    smoking: { type: Boolean, required: true },
    kidneyDisease: { type: Boolean, required: true },
    temperature: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    condition: { type: String, enum: ['good', 'moderate', 'bad'], required: true },
    feedback: { type: [String], required: true }
  },
  { timestamps: true }
);

export const HealthSuggestionData = mongoose.model<HealthSuggestionDataDocument>('HealthSuggestionData', HealthSuggestionDataSchema);
