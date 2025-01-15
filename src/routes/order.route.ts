import express from 'express';
import { bookProduct } from '../controller/order.controller';

const router = express.Router();

// Route to handle product booking
router.post('/book', bookProduct);

export default router;
