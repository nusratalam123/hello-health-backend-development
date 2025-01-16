import express from 'express';
import multer from 'multer';
import { addProduct, getAllProducts, getProductById } from '../controller/product.controller';
import upload from '../config/cloudinaryConfig';

const router = express.Router();

// Add a new product (with image upload)
router.post('/add', upload.single('image'), addProduct);

// Get all products
router.get('/list', getAllProducts);

// Get a single product by ID
router.get('/single/:productId', getProductById);

export default router;
