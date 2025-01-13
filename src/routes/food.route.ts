import { Router } from 'express';
import multer from 'multer';
import { addFood, getGoodFoods, getHighRiskFoods } from '../controller/food.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' }); 

// Route to add a new food item (with image upload)
router.post('/add', upload.single('image'), addFood);

// Route to get all good foods
router.get('/good', getGoodFoods);

// Route to get all high-risk foods
router.get('/risky', getHighRiskFoods);

export default router;
