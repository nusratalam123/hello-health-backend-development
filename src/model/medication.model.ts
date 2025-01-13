import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the user
  name: { type: String, required: true }, // Medication name
  times: [{ type: String, required: true }] // Array of times in "HH:mm" format
});

export const Medication = mongoose.model('Medication', medicationSchema);
