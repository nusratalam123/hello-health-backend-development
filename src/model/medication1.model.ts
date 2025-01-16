import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the user
  name: { type: String, required: true }, // Medication name
  times: [{ type: String, required: true }], // Array of times in "HH:mm" format
  startDate: { type: Date, required: true }, // Start date for the medication
  endDate: { type: Date, required: true }, // End date for the medication
  userEmail: { type: String, required: true } // User email for notifications
  
});

export const Medication = mongoose.model('Medication1', medicationSchema);
