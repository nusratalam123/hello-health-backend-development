import express from 'express';
import multer from 'multer';
import { addProduct, getAllProducts, getProductById } from '../controller/product.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for images

// Add a new product (with image upload)
router.post('/add', upload.single('image'), addProduct);

// Get all products
router.get('/list', getAllProducts);

// Get a single product by ID
router.get('/single/:productId', getProductById);

export default router;
