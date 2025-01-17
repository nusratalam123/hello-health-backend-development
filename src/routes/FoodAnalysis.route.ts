import express from 'express';
import multer from 'multer';
import { uploadAndAnalyzeFood } from '../controller/FoodAnalysis.controller';
import upload from '../config/cloudinaryConfig';

const router = express.Router();


router.post('/upload-food', upload.single('image'),uploadAndAnalyzeFood);

export default router;
