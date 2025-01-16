import { Request, Response } from 'express';
import { Food } from '../model/food.model';



// Add a new food item
export const addFood = async (req: Request, res: Response) => {
  try {
    const { name, benefit, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // // Upload image to Cloudinary
    // const result = await cloudinary.v2.uploader.upload(req.file.path);

    // Create a new food item
    const food = new Food({
      name,
      benefit,
      type,
      image: req.file.path// Use the URL returned by Cloudinary
    });

    await food.save();

    res.status(201).json({ message: 'Food item added successfully', food });
  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all good foods
export const getGoodFoods = async (req: Request, res: Response) => {
  try {
    const goodFoods = await Food.find({ type: 'good' });
    res.status(200).json({ goodFoods });
  } catch (error) {
    console.error('Error fetching good foods:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all high-risk foods
export const getHighRiskFoods = async (req: Request, res: Response) => {
  try {
    const riskyFoods = await Food.find({ type: 'risky' });
    res.status(200).json({ riskyFoods });
  } catch (error) {
    console.error('Error fetching risky foods:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
