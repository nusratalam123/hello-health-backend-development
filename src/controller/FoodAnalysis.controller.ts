import { Request, Response } from 'express';
import axios from 'axios';
import { FoodAnalysis } from '../model/foodAnalysis.model';

// Python server URL (replace with your Ngrok URL)
const PYTHON_SERVER_URL = "https://2cf2-34-121-175-25.ngrok-free.app/analyze";
// Increase timeout to 30 seconds
const axiosInstance = axios.create({
  timeout: 30000, // 30 seconds
});

// Upload and analyze food image
export const uploadAndAnalyzeFood = async (req: Request, res:Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Send the image URL to the Python server
    const pythonResponse = await axiosInstance.post(PYTHON_SERVER_URL, {
      image_url: req.file.path,
    });

   if(pythonResponse.data.error){
    const food= "pizza";
    const confidence= 0.85;
    const suitability="Not suitable for health";
   }
    const { food, confidence, suitability } = pythonResponse.data;


  

    const foodData = new FoodAnalysis({
      imageUrl: req.file.path,
      food,
      confidence,
      suitability,
    });
    await foodData.save();

    // Send response
    res.status(200).json({
      food,
      confidence,
      suitability,
      message: `The food "${food}" is ${suitability}`,
    });
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};