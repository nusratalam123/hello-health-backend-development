import { Router } from 'express';
import { addFood, getGoodFoods, getHighRiskFoods } from '../controller/food.controller';
import upload from '../config/cloudinaryConfig';

const router = Router();

// Route to add a new food item (with image upload)
router.post('/add', upload.single('image'), addFood);

// Route to get all good foods
router.get('/good', getGoodFoods);

// Route to get all high-risk foods
router.get('/risky', getHighRiskFoods);

export default router;
