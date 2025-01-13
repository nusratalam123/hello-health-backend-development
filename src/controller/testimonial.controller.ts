import { Request, Response } from 'express';
import { Testimonial } from '../model/testimonial.model';

// Controller to add a new testimonial
export const addTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, role, message } = req.body;

    // Validate required fields
    if (!name || !role || !message) {
      return res.status(400).json({ message: 'Name, role, and message are required' });
    }

    const testimonial = new Testimonial({ name, role, message });
    await testimonial.save();

    res.status(201).json({ message: 'Testimonial added successfully', testimonial });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to fetch all testimonials
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json({ testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
