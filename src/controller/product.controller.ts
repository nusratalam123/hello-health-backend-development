import { Request, Response } from 'express';
import Product from '../model/product.model';
import cloudinary from 'cloudinary';

// // Configure Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
//       api_key: process.env.CLOUDINARY_API_KEY,       // Replace with your Cloudinary API key
//       api_secret: process.env.CLOUDINARY_API_SECRET  // Replace with your Cloudinary API secret
//   });

// Add a product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price ,quantity } = req.body;

    // Check if an image file is provided
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Create and save the product
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      image: req.file.path,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product retrieved successfully', product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
