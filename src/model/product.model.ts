import mongoose, { Schema, Document } from 'mongoose';

// Define the Product interface
interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

// Define the Product schema
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true }, // Cloudinary image URL
});

// Create and export the Product model
const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
