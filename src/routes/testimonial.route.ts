import express from 'express';
import { addTestimonial, getTestimonials } from '../controller/testimonial.controller';

const router = express.Router();

// Route to add a new testimonial
router.post('/add', addTestimonial);

// Route to fetch all testimonials
router.get('/list', getTestimonials);

export default router;
