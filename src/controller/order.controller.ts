import { Request, Response } from 'express';
import Product from '../model/product.model';
import { Order } from '../model/order.model';

// Controller to handle product booking
export const bookProduct = async (req: Request, res: Response) => {
  try {
    const { productId, name, email, phone, address, transactionId, quantity } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if enough stock is available
    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }

    // Create the order
    const totalAmount = product.price * quantity;
    const order = new Order({
      productId,
      name,
      email,
      phone,
      address,
      transactionId,
      quantity,
      totalAmount
    });
    await order.save();

    // Decrease the product stock
    product.quantity -= quantity;
    await product.save();

    res.status(201).json({ message: 'Product booked successfully', order });
  } catch (error) {
    console.error('Error booking product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
