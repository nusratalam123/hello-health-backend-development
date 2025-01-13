import mongoose from 'mongoose';

// Define the doctor schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  specialty: {
    type: String,
    required: true,
    trim: true,
  },
  hospital: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
});

// Create and export the Doctor model
export const Doctor = mongoose.model('Doctor', doctorSchema);
