import express from 'express';
import {  analyzeHealthData, getSingleUserHealthData } from '../controller/healthSuggestionData.controller.js';

const router = express.Router();

// Route to get single user health data by userId
router.get('/user/:userId', getSingleUserHealthData);
// Route to handle health data submission with image upload
router.post('/analyze',  analyzeHealthData);

export default router;