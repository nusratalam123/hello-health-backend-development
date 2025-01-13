import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },         // Name of the person giving the testimonial
    role: { type: String, default: 'Patient', required: true },         // Role (e.g., Patient, Doctor)
    message: { type: String, required: true },      // Testimonial message
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
