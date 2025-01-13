import mongoose, { ObjectId } from "mongoose";

const healthDataSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    age: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    bloodPressure: { type: String, required: true },
    diabetes: { type: Boolean, required: true },
    temperature: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    reportImageUrl: { type: String }, // URL of the image stored in Cloudinary
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
 });


const HealthDataPost = mongoose.model("HealthData", healthDataSchema);
export default HealthDataPost;
