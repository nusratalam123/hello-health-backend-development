import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },           // Date of the event (e.g., "15 JUL")
    title: { type: String, required: true },          // Title of the event
    description: { type: String, required: true },    // Description of the event
    image: { type: String, required: true },          // Image URL for the event
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);
