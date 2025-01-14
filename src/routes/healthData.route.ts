import express from 'express';
import upload from '../config/cloudinaryConfig.js';
import { getSingleHealthData, submitHealthData } from '../controller/healthData.controller.js';

const router = express.Router();

router.get('/single/:userId',getSingleHealthData)
// Route to handle health data submission with image upload
router.post('/submit', upload.single('report'), submitHealthData);

export default router;