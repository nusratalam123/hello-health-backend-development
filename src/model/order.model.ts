import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  productId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  transactionId: string;
  quantity: number;
  totalAmount: number;
  status: string; // 'pending', 'delivered'
}

const orderSchema = new Schema<IOrder>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  transactionId: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' }
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
