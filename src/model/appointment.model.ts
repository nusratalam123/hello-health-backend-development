import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    additionalInfo: { type: String },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }, // Reference to Doctor
  },
  { timestamps: true }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
