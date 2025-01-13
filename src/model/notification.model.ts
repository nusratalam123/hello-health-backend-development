import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  message: { type: String, required: true },
  time: { type: Date, required: true },
});

export default mongoose.model('Notification', NotificationSchema);
